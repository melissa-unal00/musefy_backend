require("dotenv").config();
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  review: {
    type: String,
    minlength: 2,
  },
});

const Review = mongoose.model("Review", schema);
exports.Review = Review;
