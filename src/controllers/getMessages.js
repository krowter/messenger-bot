export const getAllMessages = async (db) => {
  try {
    const messages = await db
      .collection("messenger-bot-data")
      .find()
      .project({ _id: 0, currentState: 0 })
      .toArray();

    return messages;
  } catch (err) {
    console.log("Error when getting messages", err);
    return [];
  }
};

export const getOneMessage = async (db, { userId, messageId }) => {
  try {
    const message = await db
      .collection("messenger-bot-data")
      .find({ userId })
      .project({ [messageId]: 1, _id: 0 })
      .toArray();

    return message;
  } catch (err) {
    console.log("Error when getting messages", err);
    return [];
  }
};
