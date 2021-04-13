const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";

import fs from "fs";
import express from "express";
import eventHandlers from "./events";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

const app = express();
const router = express.Router();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const db = new JsonDB(new Config("database", true));

// serve supporting css and js file
app.use(express.static("src/client"));
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.use((socket, next) => {
  socket.db = db;
  next();
});
io.on("connection", eventHandlers);

const requestListener = function (req, res) {
  //serve the app on root path
  if (req.url === "/") req.url = "/index.html";
  //serve supporting static files
  fs.readFile(__dirname + "/client/index.html", (err, data) => {
    res.writeHead(200);
    res.end(data);
  });
};

app.get("/", requestListener);

http.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
