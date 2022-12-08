const mongoose = require("mongoose");

const AdminRole = new mongoose.Schema({
  bank: String,
  files: String,
});

module.exports = mongoose.model("AdminRole", AdminRole);
