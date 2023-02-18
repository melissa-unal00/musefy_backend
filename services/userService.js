require("dotenv").config();
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const aws = require("aws-sdk");
const jwt = require("jsonwebtoken");

const hash = (password) => {
  const hashedPassword = bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

exports.registerService = async (
  firstName,
  lastName,
  email,
  username,
  password,
  gender,
  birthday
) => {
  try {
    let userUsername = await User.findOne({ username: username });
    let userEmail = await User.findOne({ email: email });
    let user;
    if (userUsername || userEmail) {
      return false;
    } else {
      const hashedPassword = await hash(password);
      user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: hashedPassword,
        gender: gender,
        birthday: birthday,
        profileImage: `https://userimage-collection-musefy.s3.eu-central-1.amazonaws.com/profile_${username}`,
      });
    }
    await user.save();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });
    const message = {
      from: process.env.MAILER_USER,
      to: email,
      subject: `Welcome, ${user.firstName}!`,
      html: `<p> Thank you for joining our community! </p>
               <p> We are very excited to have you here. Our project is new with plenty of features free to use!</p>
               <p>You can create playlists, search for your favourite audio, chat with other online members, or even use 
               our AI feature to search for songs only by uploading a photo! </p>
               <p>If you enjoy our software and you have interesting ideas for it, do not hesitate to contact us. </p>
               <br/><br/>
               <p>Kind regards,
               <p>Team Musefy</p>`,
    };

    transporter.sendMail(message);

    return true;
  } catch (err) {
    throw Error("Register error!");
  }
};

exports.loginService = async (username, password) => {
  try {
    let user = await User.findOne({ username: username });
    if (!user) {
      return false;
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      const token = jwt.sign(
        {
          _id: user._id,
          username: username,
          firstName: user.firstName,
          lastName: user.lastName,
          birthday: user.birthday,
          gender: user.gender,
          profileImage: user.profileImage,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );

      if (passwordMatch) {
        return token;
      } else {
        return false;
      }
    }
  } catch (err) {
    throw Error("Login error!");
  }
};

exports.profileService = async (id) => {
  try {
    let user = await User.findOne({ _id: id });
    if (!user) {
      return false;
    } else {
      // userInfo = {
      //   _id: id,
      //   email: user.email,
      //   username: user.username,
      //   lastName: user.lastName,
      //   firstName: user.firstName,
      //   gender: user.gender,
      //   birthday: user.birthday,
      //   profileImage: user.profileImage,
      // };
      return user;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.deleteRecordsService = async () => {
  try {
    //check if user exists
    let user = await User.find();
    if (!user) {
      return false;
    } else {
      await User.deleteMany();
    }
    return true;
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.forgotPasswordService = async (email) => {
  try {
    let foundUser;
    await User.findOne({ email }).then((user) => {
      foundUser = user;
    });
    if (foundUser) {
      const token = jwt.sign(
        {
          _id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          username: foundUser.username,
        },
        process.env.RESET_PASSWORD_KEY,
        {
          expiresIn: "10m",
        }
      );

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      });
      const message = {
        from: process.env.MAILER_USER,
        to: email,
        subject: "Reset password link",
        html: `<p> You have submitted a request for changing your password. Click on the link below to do so. </p>
                 <p> ${process.env.CLIENT_URL}/reset-password/${token}</p>
                 <p> Note that this link will expire in 10 minutes from receiving this email. </p>`,
      };

      transporter.sendMail(message);
      await foundUser.updateOne({ resetToken: token });
      return token;
    } else return false;
  } catch (e) {
    return false;
  }
};

exports.resetPasswordService = async (
  resetToken,
  newPassword,
  repeatNewPassword
) => {
  try {
    let foundUser;
    await User.findOne({ resetToken })
      .then((user) => {
        foundUser = user;
      })
      .catch((err) => {
        if (err) return false;
      });
    if (foundUser) {
      jwt.verify(resetToken, process.env.RESET_PASSWORD_KEY);
      if (
        resetToken &&
        newPassword &&
        newPassword !== "" &&
        newPassword === repeatNewPassword
      ) {
        const newPasswordHash = await hash(newPassword);
        await foundUser.updateOne({
          password: newPasswordHash,
          resetToken: "",
        });
        return resetToken;
      } else return false;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

exports.updateUserDataService = async (lastName, firstName, email) => {
  try {
    let foundUser;
    await User.findOne({ email })
      .then((user) => {
        foundUser = user;
      })
      .catch((err) => {
        if (err) return false;
      });

    if (lastName && lastName !== foundUser.lastName) {
      await foundUser.updateOne({ lastName });
    }
    if (firstName && firstName !== foundUser.firstName) {
      await foundUser.updateOne({ firstName });
    }
    return foundUser;
  } catch (err) {
    return false;
  }
};

exports.uploadUserProfilePhotoService = async (username) => {
  try {
    const s3 = new aws.S3({
      bucketName: "userimage-collection-musefy",
      dirName: "photos",
      region: "eu-central-1",
      accessKeyId: "AKIA4WIWCJ5CU4FTU6WP",
      secretAccessKey: "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",
    });

    const imageName = "profile_" + `${username}`;
    const params = {
      Bucket: "userimage-collection-musefy",
      Key: imageName,
    };
    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    return uploadURL;
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.userIssueService = async (email, issueType, input) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });
    const message = {
      from: process.env.MAILER_USER,
      to: process.env.MAILER_USER,
      subject: `${issueType} issue`,
      html: `<p> You have received a new issue! Please reply to ${email} </p>
               <p> ${input} </p>`,
    };

    transporter.sendMail(message);

    return true;
  } catch (err) {
    return false;
  }
};

exports.getUsersService = async () => {
  try {
    let users = await User.find();
    if (!users) {
      return false;
    } else {
      return users;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.userLocationService = async (userId, latitude, longitude) => {
  try {
    let foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      return false;
    } else {
      await foundUser.updateOne({
        latitude: latitude,
        longitude: longitude,
      });
      let users = await User.find();
      return users;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.updateCurrentSongService = async (userId, currentSongId) => {
  try {
    let foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      return false;
    } else {
      await foundUser.updateOne({
        currentSongId: currentSongId,
      });
      return foundUser;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.getSelectedUserService = async (userId) => {
  try {
    let foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      return false;
    } else {
      return foundUser;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};
