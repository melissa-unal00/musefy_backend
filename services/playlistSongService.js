require("dotenv").config();
const express = require("express");
const router = express.Router();
const { PlaylistSong } = require("../models/playlistsong");
const { Audio } = require("../models/audio");

exports.allPlaylistSongService = async (userId, playlistId) => {
  try {
    let playlistSong = await PlaylistSong.find({
      userId: userId,
      playlistId: playlistId,
    });
    let songsLiked = [];
    if (!playlistSong) {
      return false;
    } else {
      for (let i = 0; i < playlistSong.length; i++) {
        let foundSong = await Audio.findById(playlistSong[i].songId);
        songsLiked.push(foundSong);
      }

      return songsLiked;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.addPlaylistSongService = async (userId, playlistId, songId) => {
  try {
    let playlistSong = await PlaylistSong.findOne({
      userId: userId,
      playlistId: playlistId,
      songId: songId,
    });
    if (playlistSong === null) {
      playlistSong = new PlaylistSong({
        userId: userId,
        playlistId: playlistId,
        songId: songId,
      });
      await playlistSong.save();
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.deletePlaylistSongService = async (userId, playlistId, songId) => {
  try {
    await PlaylistSong.deleteOne({
      userId: userId,
      playlistId: playlistId,
      songId: songId,
    });
    return true;
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.audioPaginationService = async (userId, selectedPlaylistId, page) => {
  try {
    let playlistSong = await PlaylistSong.find({
      userId: userId,
      playlistId: playlistId,
    });
    let songsLiked = [];
    if (!playlistSong) {
      return false;
    } else {
      for (let i = 0; i < playlistSong.length; i++) {
        let foundSong = await Audio.findById(playlistSong[i].songId);
        songsLiked.push(foundSong);
      }
      // const skips = 4 * (page - 1);
      // let audioOnPage = await Audio.find().skip(skips).limit(4);
      // let audioOnPage = songsLiked.skip(4 * (page - 1)).limit(4);

      for (let i = 0; i < songsLiked.length; i++) {
        let foundSong = await Audio.findById(playlistSong[i].songId);
        songsLiked.push(foundSong);
      }

      return songsLiked;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};
