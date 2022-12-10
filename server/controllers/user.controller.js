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

exports.adminAddLoan = (req, res) => {
  console.log(req.userId);
  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(404).send("can't find user");
    } else {
      const loan = new Loan({
        name: req.body.name,
        amount: req.body.amount,
        interest: req.body.interest,
        loanRepayment: req.body.loanRepayment,
        info: req.body.info,
        admin: user.roleData,
      });
      loan.save((err) => {
        if (err) {
          res.status(401).send({ error: err });
          return;
        }
      });
      console.log("adminrole=" + user.roleData._id);
      AdminRole.findByIdAndUpdate(
        user.roleData._id,
        { $push: { loans: loan._id } },
        { new: true },
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            res.save()
          }
        }
      );

      user.save();
      res.status(200).send("Loan added successfully");
    }
  });
};
