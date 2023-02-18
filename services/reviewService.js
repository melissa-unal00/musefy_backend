require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Review } = require("../models/review");

exports.allReviewsService = async () => {
  try {
    let review = await Review.find();
    if (!review) {
      return false;
    } else {
      return review;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.submitReviewService = async (username, input) => {
  try {
    let review = new Review({
      username: username,
      review: input,
    });
    await review.save();
    let allReviews = await Review.find();
    return allReviews;
  } catch (err) {
    throw Error("Data error!");
  }
};
