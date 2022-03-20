const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  username: {
    type: "string",
    require: [true, "Plese enter username"],
    minlength: 3,
    maxlegth: 50
  },
  email: {
    type: "string",
    require: [true, "Plese enter email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Plese enter email "
    ],
    unique: true
  },
  password: {
    type: "string",
    require: [true, "Plese enter password"],
    minlength: 6,
    maxlegth: 12
  }
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, username: this.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  });
};

UserSchema.methods.comparePass = async function (pass) {
  const isMatch = await bcrypt.compare(pass, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
