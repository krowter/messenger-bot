export const updateUserData = async (
  db,
  { senderId, state, received_message }
) => {
  await db.collection("messenger-bot-data").updateOne(
    {
      userId: senderId,
    },
    {
      $set: {
        currentState: state.id,
        [state.id]: received_message?.text,
      },
    },
    {
      upsert: true,
    }
  );
};
