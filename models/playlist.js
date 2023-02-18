require("dotenv").config();
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  playlistName: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  playlistSongId: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
});

const Playlist = mongoose.model("Playlist", schema);
exports.Playlist = Playlist;
