require("dotenv").config();
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  gender: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  artistImage: {
    type: String,
  },
});

const Artist = mongoose.model("Artist", schema);
exports.Artist = Artist;
