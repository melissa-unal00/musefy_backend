require("dotenv").config();
const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const {
  registerController,
  loginController,
  profileController,
  deleteRecordsController,
  forgotPasswordController,
  resetPasswordController,
  updateUserDataController,
  uploadUserProfilePhotoController,
  userIssueController,
  getUsersController,
  userLocationController,
  updateCurrentSongController,
  getSelectedUserController,
} = require("../controllers/userController");
const { verifyJWT } = require("../middleware/auth");

router.post("/forgotPassword", forgotPasswordController);
router.put("/resetPassword/:resetToken", resetPasswordController);
router.post("/register", registerController);
router.post("/login", loginController);
router.delete("/delete", deleteRecordsController);
router.get("/profile/:id", profileController);
router.put("/updateUser", updateUserDataController);
router.put("/uploadPhoto", uploadUserProfilePhotoController);
router.post("/submitIssue", userIssueController);
router.get("/getUsers", getUsersController);
router.put("/userLocation", userLocationController);
router.put("/updateCurrentSong", updateCurrentSongController);
router.post("/getSelectedUser", getSelectedUserController);

module.exports = router;
