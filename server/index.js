const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/auth-routes");
const roomRoutes = require("./routes/room_routes");
const messageRoutes = require("./routes/message_routes");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");

const mongoUri = "mongodb://localhost/pokemon";

const db = mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("hey i'm connected");
  }
);
io.on("connection", (socket) => {
//  console.log(socket)
  socket.on("save-message",data =>{
    console.log(data);
    io.emit("new-message", data );
  });
});
app.use(bodyParser.json());
app.use("/api/user", userRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/message", messageRoutes);

server.listen(3000, function () {
  console.log("listening on port 3000!");
});
