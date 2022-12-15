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

isValidEmail= (req, res, next) => {
  // regex to check if email is in correct format
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(req.body.email)){
    res.status(400).send({
      message: `${req.body.email} Is an invalid email format`,
    });
    return;
  };
  next();
};


const checkSignUp = {
  isValidEmail,
  checkDuplicateEmail,
  checkRoles
};

module.exports = checkSignUp;
