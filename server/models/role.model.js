const mongoose = require("mongoose");
const UserRole = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("UserRole", UserRole);
