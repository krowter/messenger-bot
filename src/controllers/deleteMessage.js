export const deleteOneMessage = async (db, { userId, messageId }) => {
  try {
    console.log({ userId, messageId });
    const message = await db.collection("messenger-bot-data").update(
      {
        userId,
      },
      {
        $unset: {
          [messageId]: "",
        },
      }
    );

    return message;
  } catch (err) {
    console.log("Error when getting messages", err);
    return [];
  }
};
