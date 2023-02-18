require("dotenv").config();
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  audioName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  artistName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  url: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
  },
  albumCover: {
    type: String,
  },
  timesPlayed: {
    type: Number,
    default: 0,
  },
  albumName: {
    type: String,
  },
});

const Audio = mongoose.model("Audio", schema);
exports.Audio = Audio;
