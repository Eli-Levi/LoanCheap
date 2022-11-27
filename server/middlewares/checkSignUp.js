const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "The Email already exists." });
      return;
    }
    next();
  });
};

checkRoles = (req, res, next) => {
  if (req.body.roles) {
    if (!ROLES.includes(req.body.roles)) {
      res.status(400).send({
        message: `UserRole ${req.body.roles} does not exist!`,
      });
      return;
    }
  }
  next();
};

const checkSignUp = {
  checkDuplicateEmail,
  checkRoles
};

module.exports = checkSignUp;
