const db = require("../models");
const Loan = db.loan;
/**
 * @Middleware for valdating if a loan name already exists in the database.
 * In this middleware, we expect the loan name in the body of the request.
 * @param name The name of the loan.
 * If successful then next() else return error message.
 */
checkDuplicateLoanName = (req, res, next) => {
  Loan.findOne({
    name: req.body.name,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "The Loan already exists." });
      return;
    }
    next();
  });
};

const checkAddLoan = {
  checkDuplicateLoanName,
};

module.exports = checkAddLoan;
