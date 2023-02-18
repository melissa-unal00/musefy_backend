require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Like } = require("../models/like");
const { Audio } = require("../models/audio");
const { default: mongoose } = require("mongoose");

exports.allLikeService = async () => {
  try {
    let like = await Like.find();
    if (!like) {
      return false;
    } else {
      return like;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

// exports.userLikeService = async (userId) => {
//   try {
//     let like = await Like.find({ userId: userId });
//     let songsLiked = [];
//     if (!like) {
//       return false;
//     } else {
//       for (let i = 0; i < like.length; i++) {
//         let foundSong = await Audio.findById(like[i].audioId);
//         songsLiked.push(foundSong);
//       }
//       const songsLikedFiltered = songsLiked.filter((element) => {
//         return element !== null;
//       });
//       return songsLikedFiltered;
//     }
//   } catch (err) {
//     throw Error("Data error!");
//   }
// };

exports.userLikeService = async (userId) => {
  try {
    let like = await Like.find({ userId: userId });
    if (!like) {
      return false;
    } else {
      const idsArray = like.map((elem) => {
        return elem.audioId;
      });
      const songsArray = await Audio.find({
        _id: { $in: idsArray },
      });
      return songsArray;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.deleteLikeService = async (userId, songId) => {
  try {
    await Like.deleteOne({ userId: userId, audioId: songId });
    return true;
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.addLikeService = async (userId, songId) => {
  try {
    const likedSong = new Like({
      userId: userId,
      audioId: songId,
    });
    likedSong.save();
    return true;
  } catch (err) {
    throw Error("Data error!");
  }
};
