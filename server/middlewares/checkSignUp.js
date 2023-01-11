const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

/**
 * @Middleware for verifing if a email already registered in the database.
 * In this middleware, we expect email in the request.
 * @param email The email.
 * If successful then next() else return error message accordingly.
 */
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

/**
 * @Middleware for verifing if a role is valid (admin/user).
 * In this middleware, we expect role in the request.
 * If successful then next() else return error message accordingly.
 */
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

/**
 * @Middleware for validating if a email has the proper stracture.
 * In this middleware, we expect email in the request.
 * If successful then next() else return error message accordingly.
 */
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

/**
 * @Middleware for validating if a phone number has the proper stracture.
 * In this middleware, we expect phone number in the request.
 * If successful then next() else return error message accordingly.
 */
isValidPhone= (req, res, next) => {
  // regex to check if phone number is in correct format (10 digits only)
  const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(req.body.phoneNumber)){
    res.status(400).send({
      message: `${req.body.phoneNumber} Is an invalid phone format, should be 10 digits (05xxxxxxxx)`,
    });
    return;
  };
  next();
};

const checkSignUp = {
  isValidEmail,
  checkDuplicateEmail,
  isValidPhone,
  checkRoles
};

module.exports = checkSignUp;
