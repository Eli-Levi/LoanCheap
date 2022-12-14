const mongoose = require("mongoose");

const AdminRole = new mongoose.Schema({
  bank: String,
  files: String,
  loans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
    },
  ],
});

module.exports = mongoose.model("AdminRole", AdminRole);
