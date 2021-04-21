require("dotenv").config();
import express from "express";
const router = express.Router();

import { handleMessage } from "../messenger/messengerBot";

router.post("/", (req, res) => {
  const { body, db } = req;

  // ensure webhook event is from a `page` subscription
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      const webhook_event = entry.messaging[0];
      const sender_id = webhook_event.sender.id;

      handleMessage(
        sender_id,
        webhook_event.message ?? webhook_event.postback,
        db
      );
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

router.get("/", (req, res) => {
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

export default router;
