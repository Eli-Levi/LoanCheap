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
 * @Controller GET Request paging API for searching loans.
 * In this controller, we expect to get query params in order to allow
 * paging, if we didnt get the query params that we put bellow, then we
 * assume that the params are { page = 1, limit = 10 }.
 * @param page a param send with the query to specify which page to return.
 * @param limit a param send with the query to specify the limit in the page.
 * we also expect for params in the body of the request, see bellow:
 * @param name: The name of the new loan.
 * @param min: The minimum amount of the loans.
 * @param max: The maximum amount of the loans.
 * @param interest: The interest of the loans.
 * @param loanRepayment: The loan repayment time of the loans.
 * @param info: The information of the loans,
 * @return {loans, totalPages, currentPage}, loans is for the loans in the page given, totalPages is for the number of pages,
 * and currentPage is for the page that has been requested.
 */
exports.costumerGetAllLoans = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  let data = {
    name: req.body.name,
    min: req.body.minAmount,
    max: req.body.maxAmount,
    interest: req.body.interest,
    loanRepayment: req.body.loanRepayment,
  };
  if (data.min) {
    data = {
      name: req.body.name,
      interest: req.body.interest,
      loanRepayment: req.body.loanRepayment,
      amount: { $gte: data.min, $lte: data.max },
    };
  }
  Object.keys(data).forEach((key) => {
    if (data[key] === null || data[key] === undefined) {
      delete data[key];
    }
  });
  Loan.find(data)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec(async (err, loan) => {
      if (err) {
        res.status(404).send({ error: "can't find data" });
      } else {
        const count = await Loan.countDocuments(data);
        res.status(200).send({
          loans: loan,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        });
      }
    });
};
/**
 * @Controller POST request fot a new loan request.
 * @return message if successful or error.
 */
exports.costumerRequest = (req, res) => {
  Loan.findById(req.body.loan, (err, loan) => {
    if (err) {
      res.status(404).send({ error: "can't find loan" });
    } else {
      CostumerRole.findOne({ user: req.userId }, (err, costumer) => {
        if (err) {
          res.status(404).send({ error: "can't find costumer" });
        } else {
          AdminRole.findById(req.body.admin, (err, admin) => {
            if (err) {
              res.status(404).send({ error: "can't find admin" });
            } else {
              let date = moment().format("MMM Do YY");
              const request = new Request({
                details: loan.name + "\n Amount: " + loan.amount + "₪",
                admin: admin,
                loan: loan,
                costumers: costumer,
                status: "Pending",
                date: date,
              });
              request.save((err) => {
                if (err) {
                  res.status(401).send({ error: err });
                  return;
                }
              });
              res.status(200).send({ msg: "Request submited successfully" });
            }
          });
        }
      });
    }
  });
};
/**
 * @Controller GET Request paging API for getting all the requests that an user has.
 * In this controller, we expect to get query params in order to allow
 * paging, if we didnt get the query params that we put bellow, then we
 * assume that the params are { page = 1, limit = 10 }.
 * @param page a param send with the query to specify which page to return.
 * @param limit a param send with the query to specify the limit in the page.
 * @return {requests, totalPages, currentPage}, requests is for the requests in the page given, totalPages is for the number of pages,
 * and currentPage is for the page that has been requested.
 */
exports.costumerGetAllRequests = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(404).send({ error: "can't find user" });
    } else {
      Request.find({ costumers: user.roleData })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec(async (err, request) => {
          if (err) {
            res.status(404).send({ error: "can't find data" });
          } else {
            const count = await Request.countDocuments({
              costumers: user.roleData,
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
