require("dotenv").config();
const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const {
  allPlaylistSongController,
  addPlaylistSongController,
  deletePlaylistSongController,
  audioPaginationController,
} = require("../controllers/playlistSongController");

router.post("/allPlaylistSong", allPlaylistSongController);
router.post("/addPlaylistSong", addPlaylistSongController);
router.delete("/deletePlaylistSong", deletePlaylistSongController);
router.post("/audioPagination", audioPaginationController);

module.exports = router;
