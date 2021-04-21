const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";

import fs from "fs";
import express from "express";

import MessageRoutes from "./routes/message";
import MessengerBotRoutes from "./routes/messengerBot";

const app = express();
const http = require("http").Server(app);

// serve supporting css and js file
app.use(express.static("src/client"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware to allow access to database
app.use((req, {}, next) => {
  req.db = db;
  next();
});

// routes
app.use("/messages", MessageRoutes);
app.use("/webhook", MessengerBotRoutes);

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
