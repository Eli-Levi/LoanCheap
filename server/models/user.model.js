const mongoose = require("mongoose");
const extend = require("mongoose-schema-extend");

const User = new mongoose.Schema({
  name: String,
  phoneNumber: Number,
  email: String,
  password: String,
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRole",
  },
  roleData: {
    type: mongoose.Schema.Types.ObjectId
  },
});

module.exports = mongoose.model("User", User);
