require("dotenv").config();
const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const {
  allPlaylistController,
  newPlaylistController,
  deletePlaylistController,
} = require("../controllers/playlistController");
const { verifyJWT } = require("../middleware/auth");

router.post("/allPlaylist", verifyJWT, allPlaylistController);
// router.post("/allPlaylist", allPlaylistController);
// router.post("/newPlaylist", newPlaylistController);
router.post("/newPlaylist", verifyJWT, newPlaylistController);
router.delete("/deletePlaylist", deletePlaylistController);

module.exports = router;
