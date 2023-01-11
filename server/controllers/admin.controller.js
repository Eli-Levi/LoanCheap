var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const moment = require("moment");
const db = require("../models");
const User = db.user;
const UserRole = db.role;
const AdminRole = db.admin;
const CostumerRole = db.costumer;
const Request = db.request;
const Loan = db.loan;

/**
 * @Controller PUT Request for editing a loan
 * This is a implementation of the edit loan API.
 * Before getting to this controller we have middlewares that check if the
 * token is valid, and if the user is an admin.
 * * In this controller we expect for params in the body of the request, see bellow:
 * @param name: The name of the new loan.
 * @param amount: The amount of the new loan.
 * @param interest: The interest of the new loan.
 * @param loanRepayment: The loan repayment time of the new loan.
 * @param info: The information of the new loan,
 * @param admin: The admin data of the new loan (ID of the admin data table).
 * @return a comment if successfull or not.
 */
exports.adminEditLoan = (req, res) => {
  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(404).send({ error: "can't find user" });
    } else {
      Loan.findOne(
        { name: req.body.name, admin: user.roleData },
        async (err, loan) => {
          if (err) {
            res.status(404).send({ error: "can't find data" });
          } else {
            // console.log(req.body);
            const { name, amount, interest, loanRepayment, info } = req.body;
            loan.name = name;
            loan.amount = amount;
            loan.loanRepayment = loanRepayment;
            loan.info = info;
            loan.save();
            res.status(200).send({
              message: "Loan updated",
            });
          }
        }
      );
    }
  });
};
/**
 * @Controller GET Request paging API for getting all the loans that an admin have added.
 * In this controller, we expect to get query params in order to allow
 * paging, if we didnt get the query params that we put bellow, then we
 * assume that the params are { page = 1, limit = 10 }.
 * @param page a param send with the query to specify which page to return.
 * @param limit a param send with the query to specify the limit in the page.
 * @return {loans, totalPages, currentPage}, loans is for the loans in the page given, totalPages is for the number of pages,
 * and currentPage is for the page that has been requested.
 *
 */
exports.adminGetAllLoans = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(404).send({ error: "can't find user" });
    } else {
      Loan.find({ admin: user.roleData })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec(async (err, loan) => {
          if (err) {
            res.status(404).send({ error: "can't find data" });
          } else {
            const count = await Loan.countDocuments({ admin: user.roleData });
            res.status(200).send({
              loans: loan,
              totalPages: Math.ceil(count / limit),
              currentPage: page,
            });
          }
        });
    }
  });
};
/**
 * @Controller POST Request API for adding a new loan for an admin.
 * In this controller we expect for params in the body of the request, see bellow:
 * @param name: The name of the new loan.
 * @param amount: The amount of the new loan.
 * @param interest: The interest of the new loan.
 * @param loanRepayment: The loan repayment time of the new loan.
 * @param info: The information of the new loan,
 * @param admin: The admin data of the new loan (ID of the admin data table).
 * @return a comment if successfull or not.
 */
exports.adminAddLoan = (req, res) => {
  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(404).send({ error: "can't find user" });
    } else {
      const loan = new Loan({
        name: req.body.name,
        amount: req.body.amount,
        interest: req.body.interest,
        loanRepayment: req.body.loanRepayment,
        info: req.body.info,
        admin: user.roleData,
        status: true,
        costumers: [],
        requests: [],
      });
      loan.save((err) => {
        if (err) {
          res.status(401).send({ error: err });
          return;
        }
      });
      AdminRole.findByIdAndUpdate(
        user.roleData._id,
        { $push: { loans: loan._id } },
        { new: true },
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            res.save();
          }
        }
      );

      user.save();
      res.status(200).send("Loan added successfully");
    }
  });
};
/**
 * @Controller GET Request paging API for getting all the requests that an admin has.
 * In this controller, we expect to get query params in order to allow
 * paging, if we didnt get the query params that we put bellow, then we
 * assume that the params are { page = 1, limit = 10 }.
 * @param page a param send with the query to specify which page to return.
 * @param limit a param send with the query to specify the limit in the page.
 * @return {requests, totalPages, currentPage}, requests is for the requests in the page given, totalPages is for the number of pages,
 * and currentPage is for the page that has been requested.
 */
exports.adminGetAllRequests = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(404).send({ error: "can't find user" });
    } else {
      Request.find({ admin: user.roleData })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec(async (err, request) => {
          if (err) {
            res.status(404).send({ error: "can't find data" });
          } else {
            const count = await Request.countDocuments({
              admin: user.roleData,
            });
            res.status(200).send({
              requests: request,
              totalPages: Math.ceil(count / limit),
              currentPage: page,
            });
          }
        });
    }
  });
};
/**
 * @Controller PUT Request for updating a request status.
 * In this controller we expect the params in the body of the request, see below:
 * @param status The loan request new status.
 * @return A message if the request was successful or not.
 */
exports.changeRequestStatus = (req, res) => {
  Request.findById(req.body.request, (err, request) => {
    if (err) {
      res.status(404).send({ error: "can't find request" });
    } else {
      request.status = req.body.status;
      request.save((err, responce) => {
        if (err) {
          res.status(500).send({ error: err.message });
        } else {
          res.status(200).send({ message: "request status changed" });
        }
      });
    }
  });
};
/**
 * @Controller GET Request for getting the contact information of a loan request user.
 * In this controller we expect the params in the body of the request, see below:
 * @param user The id of the user that requested the loan.
 * @return { user: user } of error message if not found.
 */
exports.getContactInfo = (req, res) => {
  User.find({ roleData: req.body.user }, (err, user) => {
    if (err) {
      res.status(404).send({ error: err.message });
    } else {
      res.status(200).send({ user: user });
    }
  });
};
/**
 * @Controller GET Request for getting the charts data for an admin.
 * @return { chartData } of error message if an error is encountered.
 */
exports.getAdminCharts = (req, res) => {
  User.findById(req.userId, async (err, user) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      const accepted = await Request.countDocuments({
        status: "Accepted",
        admin: user.roleData,
      });
      const pending = await Request.countDocuments({
        status: "Pending",
        admin: user.roleData,
      });
      const rejected = await Request.countDocuments({
        status: "Rejected",
        admin: user.roleData,
      });
      const pieChartData = [
        {
          name: "Accepted",
          population: accepted,
          color: "blue",
          legendFontColor: "black",
          legendFontSize: 15,
        },
        {
          name: "Pending",
          population: pending,
          color: "grey",
          legendFontColor: "black",
          legendFontSize: 15,
        },
        {
          name: "Rejected",
          population: rejected,
          color: "black",
          legendFontColor: "black",
          legendFontSize: 15,
        },
      ];
      const data = JSON.stringify(pieChartData);
      res.status(200).send({ pieChartData });
    }
  });
};
