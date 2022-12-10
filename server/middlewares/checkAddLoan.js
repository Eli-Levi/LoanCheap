const db = require("../models");
const Loan = db.loan;

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
