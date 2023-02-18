require("dotenv").config();
const express = require("express");
const { Audio } = require("../models/audio");
const aws = require("aws-sdk");
const { PlaylistSong } = require("../models/playlistsong");

exports.allAudioService = async (userId) => {
  try {
    let audio = await Audio.find();
    if (!audio) {
      return false;
    } else {
      return audio;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.searchAudioService = async (value) => {
  try {
    // let foundArtist = Audio.find({ artistName: { $regex: `${value}` } });

    if (value !== "") {
      const regex = new RegExp(value, "i"); // i for case insensitive
      console.log(regex);
      let foundArtist = await Audio.find({ artistName: { $regex: regex } });
      let foundAudio = await Audio.find({ audioName: { $regex: regex } });
      if (foundArtist.length > 0) {
        foundArtist.concat(foundAudio);
        return foundArtist;
      } else if (foundAudio.length > 0) {
        foundAudio.concat(foundArtist);
        return foundAudio;
      } else {
        return false;
      }
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.allPlaylistsService = async (userId) => {
  try {
    let playlistSong = await PlaylistSong.find({ userId: userId });
    let allSongs = [];
    if (!playlistSong) {
      return false;
    } else {
      for (let i = 0; i < playlistSong.length; i++) {
        let foundSong = await Audio.findById(playlistSong[i].songId);
        allSongs.push(foundSong);
      }
    }
    const allSongsUnique = allSongs.reduce((previousArray, current) => {
      const duplicate = previousArray.find(
        (item) => item.audioName === current.audioName
      );
      if (!duplicate) {
        return previousArray.concat([current]);
      } else {
        return previousArray;
      }
    }, []);

    return allSongsUnique;
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.uploadAlbumCoverService = async (userId) => {
  try {
    const s3 = new aws.S3({
      bucketName: "imagesearch-collection-musefy",
      dirName: "photos",
      region: "eu-central-1",
      accessKeyId: "AKIA4WIWCJ5CW4BRHPM3",
      secretAccessKey: "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",
    });

    const imageName = "uploaded_" + `${userId}`;
    const params = {
      Bucket: "imagesearch-collection-musefy",
      Key: imageName,
    };
    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    return uploadURL;
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.findAlbumCoverService = async (img) => {
  try {
    let audio = await Audio.find();
    for (let i = 0; i < audio.length; i++) {
      // const img1 = new Image();
      // img1.src = audio[i].albumCover;
      // img1.crossOrigin = "Anonymous";
      // img1.onload = () =>
      //   tf.browser
      //     .fromPixels(img)
      //     .resizeNearestNeighbor([150, 150])
      //     .toFloat()
      //     .expandDims();
      // const result = await model.classify(img1);
    }

    // const img1 = new Image();
    // img1.src = imgURL;
    // img1.crossOrigin = "Anonymous";
    // img1.onload = () =>
    //   tf.browser
    //     .fromPixels(img)
    //     .resizeNearestNeighbor([150, 150])
    //     .toFloat()
    //     .expandDims();
    // console.log(img);
    // const result = await model.classify(img1);

    // console.log(result);
    return img;
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.updateTimesPlayedService = async (audioId) => {
  try {
    const audio = await Audio.findOne({ _id: audioId });
    if (!audio) {
      return false;
    } else {
      await audio.updateOne({ $inc: { timesPlayed: 1 } });
      return true;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.trendingService = async () => {
  try {
    let audio = await Audio.find().sort({ timesPlayed: -1 });
    if (!audio) {
      return false;
    } else {
      const audioFinal = audio.slice(0, 5);
      return audioFinal;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

// exports.audioPaginationService = async (userId, selectedPlaylistId, page) => {
//   try {
//     // const total = Audio.count();
//     let playlistSong = await PlaylistSong.find({
//       userId: userId,
//       playlistId: playlistId,
//     });
//     const skips = 4 * (page - 1);
//     let audioOnPage = await Audio.find().skip(skips).limit(4);
//     return audioOnPage;
//   } catch (err) {
//     throw Error("Data error!");
//   }
// };

exports.getAlbumService = async (artistName) => {
  try {
    const songs = await Audio.find({ artistName: artistName });
    const albums = songs.map((value) => value.albumName);
    const albumsFinal = [...new Set(albums)];
    if (!albumsFinal) {
      return false;
    } else {
      return albumsFinal;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.testService = async (uploadedImage) => {
  try {
    console.log(uploadedImage);
    return true;
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.randomAudioService = async () => {
  try {
    let audio = await Audio.find();
    if (!audio) {
      return false;
    } else {
      let randomAudio = [];
      for (let i = 0; i < audio.length; i++) {
        if (i < 5) {
          const randomItem = audio[Math.floor(Math.random() * audio.length)];
          randomAudio.push(randomItem);
        }
      }
      return randomAudio;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};
