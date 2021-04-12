const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

import fs from "fs";
import express from "express";
const app = express();
const http = require("http").Server(app);

// serve supporting css and js file
app.use(express.static("src/public"));

const requestListener = function (req, res) {
  //serve the app on root path
  if (req.url === "/") req.url = "/index.html";
  //serve supporting static files
  fs.readFile(__dirname + "/public/index.html", (err, data) => {
    res.writeHead(200);
    res.end(data);
  });
};

app.get("/", requestListener);

http.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
