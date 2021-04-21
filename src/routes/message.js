import express from "express";
import { getAllMessages, getOneMessage } from "../controllers/getMessages";
import { deleteOneMessage } from "../controllers/deleteMessage";
import { async } from "regenerator-runtime";

const router = express.Router();

router.get("/", async (req, res) => {
  const messages = await getAllMessages(req.db);

  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(messages, null, 2));
});

router.get("/:userId/:messageId", async (req, res) => {
  const { userId, messageId } = req.params;
  try {
    const data = await getOneMessage(req.db, { userId, messageId });

    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(data, null, 2));
  } catch (DataError) {
    res.sendStatus(404);
  }
});

router.get("/:userId/:messageId/delete", ({}, res) => {
  res.status(405).send("Please use a DELETE to for this endpoint");
});

router.delete("/:userId/:messageId/delete", async (req, res) => {
  const { userId, messageId } = req.params;
  try {
    const isExists = await getOneMessage(req.db, { userId, messageId });
    if (!isExists) throw DataError;

    await deleteOneMessage(req.db, { userId, messageId });
    res.send(200);
  } catch (DataError) {
    console.log(DataError);
    res.sendStatus(404);
  }
});

export default router;
