require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
    getArtistController, 
    randomArtistController,

} = require("../controllers/artistController");
//const { verifyJWT } = require("../middleware/auth");

router.get("/getArtist/:artistName", getArtistController);
router.get("/randomArtist", randomArtistController);


module.exports = router;
