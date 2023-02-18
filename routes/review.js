require("dotenv").config();
const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const {
  allReviewsController,
  submitReviewController,
} = require("../controllers/reviewController");

router.get("/allReviews", allReviewsController);
router.post("/submitReview", submitReviewController);

module.exports = router;
