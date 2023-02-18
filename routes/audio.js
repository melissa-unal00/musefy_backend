require("dotenv").config();
const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const {
  allAudioController,
  uploadAlbumCoverController,
  findAlbumCoverController,
  updateTimesPlayedController,
  trendingController,
  allPlaylistsController,
  getAlbumController,
  searchAudioController,
  testController,
  randomAudioController,
} = require("../controllers/audioController");
//const { verifyJWT } = require("../middleware/auth");

router.get("/allAudio", allAudioController);
router.post("/searchAudio", searchAudioController);
router.post("/allPlaylists", allPlaylistsController);
router.put("/uploadImage", uploadAlbumCoverController);
router.post("/findImage", findAlbumCoverController);
router.put("/updateTimesPlayed", updateTimesPlayedController);
router.get("/trending", trendingController);
router.post("/getAlbums", getAlbumController);
router.post("/test", testController);
router.get("/randomAudio", randomAudioController);
// router.post("/audioPagination", audioPaginationController);

module.exports = router;
