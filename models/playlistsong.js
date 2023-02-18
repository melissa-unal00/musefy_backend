require("dotenv").config();
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  playlistId: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  songId: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
});

const PlaylistSong = mongoose.model("PlaylistSong", schema);
exports.PlaylistSong = PlaylistSong;
