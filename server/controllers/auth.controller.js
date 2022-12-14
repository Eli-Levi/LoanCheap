var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const UserRole = db.role;
const AdminRole = db.admin;
const CostumerRole = db.costumer;
const Loan = db.loan;
/**
 * @Controller POST request API for signup.
 * This is signup for a new admin of customer.
 * For the params in the body of the request, see below:
 * @phoneNumber the phone number of the user.
 * @name the name of the user.
 * @email the email of the user.
 * @password the password of the user.
 * if it's a admin, then these params are also added:
 * @files link for the files that spicify that user works in a bank
 * @bank name the name of the bank.
 */
exports.signup = (req, res) => {
  const num = Number(req.body.phoneNumber);
  if (!(Number.isInteger(num) && num > 0)) {
    res.status(401).send({ error: "Enter a valid phone number" });
    return;
  }
  const user = new User({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save((err, user) => {
    if (err) {
      res.status(401).send({ error: err });
      User.findById(user.id).remove();
      return;
    }
    if (req.body.roles) {
      console.log(req.body.roles);
      UserRole.findOne(
        {
          name: req.body.roles,
        },
        (err, roles) => {
          if (err) {
            res.status(401).send({ error: err });
            return;
          }
          user.roles = roles;
          if (roles.name === "admin") {
            const adminRole = new AdminRole({
              bank: req.body.bank,
              files: req.body.files,
              loans: [],
            });
            adminRole.save((err) => {
              if (err) {
                res.status(401).send({ error: err });
                return;
              }
            });
            user.roleData = adminRole;
          } else {
            const costumer = new CostumerRole({ SubmittedRequests: [], user: user });
            costumer.save((err) => {
              if (err) {
                res.status(401).send({ error: err });
                return;
              }
            });
            user.roleData = costumer;
          }
          user.save((err) => {
            if (err) {
              res.status(401).send({ error: err });
              return;
            }
            console.log("user added");
            res.status(200).send({ message: "User added" });
          });
        }
      );
    }
  });
};
/**
 * @Controller POST request API for signip.
 * This is signin for a admin of customer.
 * For the params in the body of the request, see below:
 * @email the email of the user.
 * @password the password of the user.
 * @return JSON with the access token and role of the user.
 */
exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var password = bcrypt.compareSync(req.body.password, user.password);

    if (password === false) {
      return res.status(401).send({
        accessToken: null,
        message: "worng password",
      });
    }
    UserRole.findById(user.roles).exec((err, role) => {
      var token = jwt.sign({ id: user.id }, config.secret, {});
      res.status(200).send({
        roles: role.name,
        accessToken: token,
      });
    });
  });
};
