require("dotenv").config();
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  audioId: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
});

const Like = mongoose.model("Like", schema);
exports.Like = Like;
