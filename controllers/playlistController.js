const playlistService = require("../services/playlistService");
const Joi = require("joi").extend(require("@joi/date"));

exports.allPlaylistController = async (req, res) => {
  const { userId } = req.body;
  try {
    const isSuccessful = await playlistService.allPlaylistService(userId);
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

exports.newPlaylistController = async (req, res) => {
  const { playlistName, userId } = req.body;
  try {
    const isSuccessful = await playlistService.newPlaylistService(
      playlistName,
      userId
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

exports.deletePlaylistController = async (req, res) => {
  const { playlistName, userId, playlistId } = req.body;
  try {
    const isSuccessful = await playlistService.deletePlaylistService(
      playlistName,
      userId,
      playlistId
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
