import { callSendAPI } from "../controllers/sendMessage";
import { messengerStates as states } from "./states";
import { getState } from "../helpers";
import { updateUserData } from "../controllers/updateUser";

export const handleMessage = async (senderId, received_message, db) => {
  if (received_message?.is_echo) return;

  try {
    // keep track of each user by their senderId
    const [user] = await db
      .collection("messenger-bot-data")
      .find({ userId: senderId })
      .toArray();
    let message, state;

    state = getState(states, user?.currentState);

    if (user && !state.validation.pattern.test(received_message.text)) {
      console.log("VALIDD");
      callSendAPI(senderId, { text: state.validation.errorMessage });
      return;
    }

    if (!user) {
      // new users start from 1st state
      state = states[0];
    } else {
      const nextState = getState(states, user.currentState).nextState;
      state = getState(states, nextState);
    }

    message =
      state.response ??
      state.payloadHandler[received_message.quick_reply?.payload ?? "NO"];

    updateUserData(db, { senderId, received_message, state });

    //pass user data to handlers
    callSendAPI(senderId, message(user));
  } catch (ERROR) {
    console.log({ ERROR });
  }
};
