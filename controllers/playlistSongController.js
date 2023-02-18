const playlistSongService = require("../services/playlistSongService");
const Joi = require("joi").extend(require("@joi/date"));

exports.allPlaylistSongController = async (req, res) => {
  const { userId, playlistId } = req.body;
  try {
    const isSuccessful = await playlistSongService.allPlaylistSongService(
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

exports.addPlaylistSongController = async (req, res) => {
  const { userId, playlistId, songId } = req.body;
  try {
    const isSuccessful = await playlistSongService.addPlaylistSongService(
      userId,
      playlistId,
      songId
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

exports.deletePlaylistSongController = async (req, res) => {
  const { userId, playlistId, songId } = req.body;
  try {
    const isSuccessful = await playlistSongService.deletePlaylistSongService(
      userId,
      playlistId,
      songId
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

exports.audioPaginationController = async (req, res) => {
  const { userId, selectedPlaylistId, page } = req.body;
  try {
    const isSuccessful = await audioService.audioPaginationService(
      userId,
      selectedPlaylistId,
      page
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
