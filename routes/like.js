require("dotenv").config();
const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const {
  allLikeController,
  userLikeController,
  deleteLikeController,
  addLikeController
} = require("../controllers/likeController");

router.get("/allLike", allLikeController);
router.post("/userLike", userLikeController);
router.delete("/deleteLike", deleteLikeController);
router.post("/addLike", addLikeController);

module.exports = router;
