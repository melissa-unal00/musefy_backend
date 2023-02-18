const audioService = require("../services/audioService");
const Joi = require("joi").extend(require("@joi/date"));

exports.allAudioController = async (req, res) => {
  const { userId } = req.body;
  try {
    const isSuccessful = await audioService.allAudioService(userId);
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

exports.searchAudioController = async (req, res) => {
  const { value } = req.body;
  try {
    const isSuccessful = await audioService.searchAudioService(value);
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

exports.allPlaylistsController = async (req, res) => {
  const { userId } = req.body;
  try {
    const isSuccessful = await audioService.allPlaylistsService(userId);
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

exports.uploadAlbumCoverController = async (req, res) => {
  const { userId } = req.body;
  try {
    const isSuccessful = await audioService.uploadAlbumCoverService(userId);
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

exports.findAlbumCoverController = async (req, res) => {
  const { img } = req.body;
  try {
    const isSuccessful = await audioService.findAlbumCoverService(img);
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

exports.updateTimesPlayedController = async (req, res) => {
  const { audioId } = req.body;
  try {
    const isSuccessful = await audioService.updateTimesPlayedService(audioId);
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

exports.trendingController = async (req, res) => {
  try {
    const isSuccessful = await audioService.trendingService();
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

// exports.audioPaginationController = async (req, res) => {
//   const { userId, selectedPlaylistId, page } = req.body;
//   try {
//     const isSuccessful = await audioService.audioPaginationService(
//       userId,
//       selectedPlaylistId,
//       page
//     );
//     if (isSuccessful) {
//       return res.status(200).json({ data: isSuccessful });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "Can't display this information" });
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "Error! Something went wrong!" });
//   }
// };

exports.getAlbumController = async (req, res) => {
  const { artistName } = req.body;
  try {
    const isSuccessful = await audioService.getAlbumService(artistName);
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

exports.testController = async (req, res) => {
  const { uploadedImage } = req.body;
  try {
    const isSuccessful = await audioService.testService(uploadedImage);
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

exports.randomAudioController = async (req, res) => {
  try {
    const isSuccessful = await audioService.randomAudioService();
    if (isSuccessful) {
      return res.status(200).json({ data: isSuccessful });
    }
    return res.status(400).json({ message: "Couldn't get data!" });
  } catch (err) {
    return res.status(500).json({ message: "Error! Something went wrong." });
  }
};
