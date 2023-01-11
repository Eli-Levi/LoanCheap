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

exports.adminEditLoan = (req, res) => {
  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(404).send({ error: "can't find user" });
    } else {
      Loan.findOne({ name: req.body.name, admin: user.roleData }, async (err, loan) => {
        if (err) {
          res.status(404).send({ error: "can't find data" });
        } else {
          // console.log(req.body);
          const { name, amount, interest, loanRepayment, info } = req.body;
            loan.name = name;
            loan.amount = amount;
            loan.loanRepayment = loanRepayment;
            loan.info = info;
            // loan.status = status;
          loan.save();
          res.status(200).send({
            message: "Loan updated"
          });

        }
      });
    }
  });
};

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

exports.getContactInfo = (req, res) => {
  User.find({ roleData: req.body.user }, (err, user) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send({ user: user });
    }
  });
};

exports.getAdminCharts = (req, res) => {
  User.find({ roleData: req.body.user }, async (err, user) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      const accepted = await Request.countDocuments({ status: "Accepted" });
      const pending = await Request.countDocuments({ status: "Pending" });
      const rejected = await Request.countDocuments({ status: "Rejected" });
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