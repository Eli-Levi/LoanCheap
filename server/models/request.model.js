const mongoose = require("mongoose");

const Request = new mongoose.Schema({
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
});

module.exports = mongoose.model("Request", Request);
