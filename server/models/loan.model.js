const mongoose = require("mongoose");

const Loan = new mongoose.Schema({
  name: String,
  amount: { type: Number, min: 0 },
  interest: { type: Number, min: 0, max: 100 },
  loanRepayment: { type: Number, min: 0 },
  info: String,
  status: Boolean,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminRole",
  },
  costumers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CostumerRole",
    },
  ],
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
});

module.exports = mongoose.model("Loan", Loan);
