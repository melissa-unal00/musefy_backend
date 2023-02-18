require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Playlist } = require("../models/playlist");
const { PlaylistSong } = require("../models/playlistsong");

exports.allPlaylistService = async (userId) => {
  try {
    let playlist = await Playlist.find({ userId: userId });
    if (!playlist) {
      return false;
    } else {
      return playlist;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.newPlaylistService = async (playlistName, userId) => {
  try {
    let foundPlaylist = await Playlist.findOne({
      playlistName: playlistName,
      userId: userId,
    });
    if (foundPlaylist) return false;
    else {
      let newPlaylist = new Playlist({
        userId: userId,
        playlistName: playlistName,
      });
      await newPlaylist.save();
      return newPlaylist;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.deletePlaylistService = async (playlistName, userId, playlistId) => {
  try {
    await Playlist.deleteOne({ userId: userId, playlistName: playlistName });
    await PlaylistSong.deleteMany({ userId: userId, playlistId: playlistId });
    return true;
  } catch (err) {
    throw Error("Data error!");
  }
};
