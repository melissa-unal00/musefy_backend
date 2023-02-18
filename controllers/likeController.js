const likeService = require("../services/likeService");
const Joi = require("joi").extend(require("@joi/date"));

exports.allLikeController = async (req, res) => {
  try {
    const isSuccessful = await likeService.allLikeService();
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

exports.userLikeController = async (req, res) => {
  const { userId } = req.body;
  try {
    const isSuccessful = await likeService.userLikeService(userId);
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

exports.deleteLikeController = async (req, res) => {
  const { userId, songId } = req.body;
  try {
    const isSuccessful = await likeService.deleteLikeService(userId, songId);
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


exports.addLikeController = async (req, res) => {
  const { userId, songId } = req.body;
  try {
    const isSuccessful = await likeService.addLikeService(userId, songId);
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