const mongoose = require("mongoose");

const CostumerRole = new mongoose.Schema({
  SubmittedRequests: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loan",
  },
});

module.exports = mongoose.model("CostumerRole", CostumerRole);
