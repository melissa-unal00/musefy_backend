require("dotenv").config();
const express = require("express");
const app = express();
const users = require("./routes/users");
const audio = require("./routes/audio");
const artist = require("./routes/artist");
const like = require("./routes/like");
const playlist = require("./routes/playlist");
const playlistSong = require("./routes/playlistsong");
const review = require("./routes/review");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
var cors = require("cors");
PORT = process.env.PORT || 3001;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

//if it doesn't work check IP whitelist
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`
  )
  .then(() => console.log("Connected to mongo"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/users", users);
app.use("/api/audio", audio);
app.use("/api/artist", artist);
app.use("/api/like", like);
app.use("/api/playlist", playlist);
app.use("/api/playlistSong", playlistSong);
app.use("/api/review", review);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Working");
});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
