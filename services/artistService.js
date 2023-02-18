require("dotenv").config();
const express = require("express");
const { Artist } = require("../models/artist");

exports.getArtistService = async (artistName) => {
  try {
    let artist = await Artist.findOne({ artistName: artistName });
    if (!artist) {
      return false;
    } else {
      return artist;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};

exports.randomArtistService = async () => {
  try {
    let artist = await Artist.find();
    if (!artist) {
      return false;
    } else {
      let randomArtists = [];
      for (let i = 0; i < artist.length; i++) {
        for (let j = 0; j < 5; j++) {
          const randomItem = artist[Math.floor(Math.random() * artist.length)];
          randomArtists.push(randomItem);
        }
      }
      return randomArtists;
    }
  } catch (err) {
    throw Error("Data error!");
  }
};
