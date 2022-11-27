const mongoose = require("mongoose");

const CostumerRole = new mongoose.Schema({
  SubmittedRequests: { leanName: String },
});

module.exports = mongoose.model("CostumerRole", CostumerRole);
