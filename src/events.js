const fs = require("fs");

const emitters = {
  //send this upon initial connection
  initial: {
    userResponseEvent: "user_name",
    message: "Hi! I see you're a new user. What's your name?",
  },
  birthday: {
    userResponseEvent: "user_birthday",
    message:
      "Bots like me weren't born, we're created. What about you, when were you born?",
  },
  nextBirthdayWhen: {
    userResponseEvent: "user_next-birthday-when",
    message: "Hi! I see you're a new user. What's your name?",
  },
  goodbye: {
    userResponseEvent: "user_next-birthday-when",
    message: "Bye!",
  },
};

const handlers = [
  { eventName: "user_name", emitter: emitters.birthday },
  { eventName: "user_birthday", emitter: emitters.nextBirthdayWhen },
  { eventName: "user_next-birthday-when", emitter: emitters.goodbye },
];

export default (socket) => {
  // to be displayed on terminal in client-side
  const botName = "Bot";

  // send welcome message initially
  socket.emit("bot-event", { ...emitters.initial, botName });

  handlers.forEach(({ eventName, emitter }) => {
    socket.on(eventName, (message) => {
      fs.appendFileSync("message.txt", message);
      socket.emit("bot-event", { ...emitter, botName });
    });
  });
};
