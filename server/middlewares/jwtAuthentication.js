const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const UserRole = db.role;

checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "can't log in" });
    }
    req.userId = decoded.id;
    next();
  });
};

checkAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    UserRole.findById(
      {
        _id: user.roles,
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (roles.name === "admin") {
          next();
          return;
        }
        res.status(403).send({ message: "not a admin" });
        return;
      }
    );
  });
};

checkUser = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    UserRole.findById(
      {
        _id: user.roles,
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log(roles.name);
        if (roles.name === "user") {
          next();
          return;
        }
        res.status(403).send({ message: "not a user" });
        return;
      }
    );
  });
};

const jwtAuthentication = {
  checkToken,
  checkAdmin,
  checkUser,
};
module.exports = jwtAuthentication;
