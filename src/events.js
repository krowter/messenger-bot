const fs = require("fs");

const emitters = {
  //send this upon initial connection
  initial: (socket) =>
    socket.emit("bot-event", {
      userResponseEvent: "new-user__name:submit",
      message: "Hi! I see you're a new user. What's your name?",
    }),
  birthday: (socket) =>
    socket.emit("bot-event", {
      userResponseEvent: "new-user__birthday:submit",
      message:
        "Bots like me weren't born, we're created. What about you, when were you born?",
    }),
  nextBirthdayWhen: (socket) =>
    socket.emit("bot-event", {
      userResponseEvent: "new-user__next-birthday-when:submit",
      message: "Hi! I see you're a new user. What's your name?",
    }),
  goodbye: (socket) =>
    socket.emit("bot-event", {
      userResponseEvent: "new-user__next-birthday-when:submit",
      message: "Bye!",
    }),
};

const handlers = (socket) => {
  socket.on("new-user__name:submit", (arg) => {
    fs.appendFileSync("message.txt\n", arg);
    emitters.birthday(socket);
  });
  socket.on("new-user__birthday:submit", (arg) => {
    fs.appendFileSync("message.txt\n", arg);
    emitters.nextBirthdayWhen(socket);
  });
  socket.on("new-user__next-birthday-when:submit", (arg) => {
    fs.appendFileSync("message.txt\n", arg);
    emitters.goodbye(socket);
  });
};

export default (socket) => {
  emitters.initial(socket);
  handlers(socket);
};
