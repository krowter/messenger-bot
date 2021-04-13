import { customAlphabet } from "nanoid";

import { storeUserData } from "../helpers";
import { handlers } from "./handlers";

// easier for humans to read and type
const nanoid = customAlphabet("123456789ABCDEF", 6);

const initialEvent = {
  nextEvent: "user_name",
  message: "Hi! I see you're a new user. What's your name?",
};

export default (socket) => {
  // name to be displayed in terminal on client side
  const botName = "Bot";
  const event = "bot-event";
  const userId = nanoid();
  let user = {};

  // welcome message
  socket.emit(event, { ...initialEvent, botName });

  /* for each user response, 
      if it's valid, store them in database and send the next mesage
      if not, send the error message */
  handlers.forEach(({ eventName, response, validation }, index) => {
    socket.on(eventName, (message) => {
      if (validation.pattern.test(message)) {
        // update user data to be used in subsequent messages
        user = storeUserData(user, eventName, message);

        // group messages by userId
        socket.db.push(`/messages/${userId}[${index}]`, {
          eventName,
          message,
          timestamp: new Date().toISOString(),
        });

        socket.emit(event, {
          ...response,
          message: response.message(user),
          botName,
        });
      } else {
        socket.emit(event, {
          nextEvent: eventName,
          message: validation.errorMessage,
          botName,
        });
      }
    });
  });
};
