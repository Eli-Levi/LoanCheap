var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const UserRole = db.role;
const AdminRole = db.admin;
const CostumerRole = db.costumer;
const Loan = db.loan;

exports.userBoard = (req, res) => {
  res.status(200).send("User");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin");
};

exports.adminEditLoan = (req, res) => {
  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(404).send({ error: "can't find user" });
    } else {
      Loan.findById(req.body.loanId).exec(async (err, loan) => {
        if (err) {
          res.status(404).send({ error: "can't find data" });
        } else {
          const { name, amount, interest, loanRepayment, info, status } =
            req.body.newData;
          loan.name = name;
          loan.amount = amount;
          loan.loanRepayment = loanRepayment;
          loan.info = info;
          loan.status = status;
          loan.save();
          res.status(200).send({
            loan: loan,
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

exports.costumerGetAllLoans = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  let data = {
    name: req.body.name,
    amount: req.body.amout,
    interest: req.body.interest,
    loanRepayment: req.body.loanRepayment,
  };
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
        const count = await Loan.countDocuments({
          name: req.body.name,
          amount: req.body.amout,
          interest: req.body.interest,
          loanRepayment: req.body.loanRepayment,
        });
        res.status(200).send({
          loans: loan,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        });
      }
    });
};
