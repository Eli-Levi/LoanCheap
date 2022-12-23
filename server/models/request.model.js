const mongoose = require("mongoose");

const Request = new mongoose.Schema({
  details: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminRole",
  },
  loan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loan",
  },
  costumers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CostumerRole",
  },
  status: String,
  date: String,
});

module.exports = mongoose.model("Request", Request);
