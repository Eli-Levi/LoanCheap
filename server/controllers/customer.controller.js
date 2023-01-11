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

exports.userBoard = (req, res) => {
  res.status(200).send("User");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin");
};



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
              // let dateObject = new Date();
              // let date = dateObject.getDate()+"/"+dateObject.getMonth()+"/"+dateObject.getYear();
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
