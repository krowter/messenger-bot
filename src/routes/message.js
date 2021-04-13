import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(req.db.getData("messages"), null, 2));
});

router.get("/:userId/:messageId", (req, res) => {
  const { userId, messageId } = req.params;
  try {
    const data = req.db.getData(`/messages/${userId}/${messageId}`);
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(data, null, 2));
  } catch (DataError) {
    res.sendStatus(404);
  }
});

router.get("/:userId/:messageId/delete", ({}, res) => {
  res.status(405).send("Please use a DELETE to for this endpoint");
});

router.delete("/:userId/:messageId/delete", (req, res) => {
  const { userId, messageId } = req.params;
  try {
    const data = req.db.delete(`/messages/${userId}/${messageId}`);
    res.sendStatus(200);
  } catch (DataError) {
    res.sendStatus(404);
  }
});

export default router;
