require("dotenv").config();
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  birthday: {
    type: Date,
    required: true,
    min: "1900-01-01",
    max: "2005-01-01",
  },
  profileImage: {
    type: String,
    default: "",
  },
  resetToken: {
    data: String,
    default: "",
  },
  liked: [{ type: String }],
  latitude: {
    type: String,
    default: "0",
  },
  longitude: {
    type: String,
    default: "0",
  },
  currentSongId: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", schema);
exports.User = User;
