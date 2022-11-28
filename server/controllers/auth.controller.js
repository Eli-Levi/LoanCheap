var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const UserRole = db.role;
const AdminRole = db.admin;
const CostumerRole = db.costumer;

exports.signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
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
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles;
          if (roles.name === "admin") {
            const adminRole = new AdminRole({
              bank: req.body.bank,
              files: req.body.files,
            });
            adminRole.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
            });
            user.roleData = adminRole;
          } else {
            const costumer = new CostumerRole({SubmittedRequests: []});
            costumer.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
            });
            user.roleData = costumer;
          }
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User added" });
          });
          
        }
      );
    }
  });
};

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

    var token = jwt.sign({ id: user.id }, config.secret, {});
    res.status(200).send({
      id: user._id,
      email: user.email,
      roles: user.roles,
      accessToken: token,
    });
  });
};
