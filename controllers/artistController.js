const artistService = require("../services/artistService");
const Joi = require("joi").extend(require("@joi/date"));

exports.getArtistController = async (req, res) => {
  const { artistName } = req.params;
  try {
    const isSuccessful = await artistService.getArtistService(artistName);
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

exports.randomArtistController = async (req, res) => {
  try {
    const isSuccessful = await artistService.randomArtistService();
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