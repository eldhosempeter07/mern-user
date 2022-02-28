const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    default: crypto.randomBytes(12).toString("hex"),
    unique: true,
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  password: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please add some text"],
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please add some text"],
  },
  gender: {
    type: String,
    required: [true, "Please add some text"],
  },
  interest: {
    type: String,
    required: [true, "Please add some text"],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("User", UserSchema);
