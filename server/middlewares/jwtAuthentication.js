const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const UserRole = db.role;

/**
 * @Middleware for valdating if a token already exists in the database.
 * In this middleware, we expect the token in the body of the request.
 * @param token The token.
 * If successful then next() else return error message.
 */
checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(token);
      return res.status(401).send({ message: "can't log in" });
    }
    req.userId = decoded.id;
    next();
  });
};

/**
 * @Middleware for valdating if a user is a vaild admin.
 * In this middleware, we expect userID in the body of the request.
 * If successful then next() else return error message.
 */
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

/**
 * @Middleware for valdating if a user is a vaild costumer('user').
 * In this middleware, we expect userID in the body of the request.
 * If successful then next() else return error message.
 */
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
