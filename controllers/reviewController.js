const reviewService = require("../services/reviewService");
const Joi = require("joi").extend(require("@joi/date"));

exports.allReviewsController = async (req, res) => {
  try {
    const isSuccessful = await reviewService.allReviewsService();
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    } else {
      return res
        .status(400)
        .json({ message: "Can't display this information" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Error! Something went wrong!" });
  }
};

exports.submitReviewController = async (req, res) => {
  const { username, input } = req.body;
  try {
    const isSuccessful = await reviewService.submitReviewService(
      username,
      input
    );
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    } else {
      return res
        .status(400)
        .json({ message: "Can't display this information" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Error! Something went wrong!" });
  }
};
