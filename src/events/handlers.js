export const handlers = [
  {
    eventName: "user_name",
    validation: {
      pattern: /[a-z]+/,
      errorMessage:
        "Are you James Bond? Your name must have one or more letter",
    },
    response: {
      nextEvent: "user_birthday",
      message: (userName) =>
        `Bots like me weren't born, we're created. What about you ${userName}, when were you born?`,
    },
  },
  {
    eventName: "user_birthday",
    validation: {
      // MM must be <= 12
      // DD must be <= 31
      pattern: /\d{4}-[0-1]\d-([0-2][0-9]|3[0-1])/,
      errorMessage:
        "I'm sorry, I didn't get that. Can you please write it in form of YYYY-MM-DD?",
    },
    response: {
      nextEvent: "user_next-birthday-when",
      message: (userName) =>
        `Would you like to know when your next birthday is, ${userName}?`,
    },
  },
  {
    eventName: "user_next-birthday-when",
    validation: {
      // valid as long as it stars with "y" or "n"
      pattern: /(y|n)\w*/i,
      errorMessage: "Please answer using yes, no, yay, nay, yeah, etc.",
    },
    response: {
      nextEvent: "user_goodbye",
      message: (userName) =>
        `It was nice meeting you ${userName}. See ya later!`,
    },
  },
  {
    eventName: "user_goodbye",
    validation: {
      pattern: /.+/,
      errorMessage: "I'm sorry, I didn't get that.",
    },
    response: {
      nextEvent: "user_goodbye",
      message: () => `Bye! Please refresh this page to start again.`,
    },
  },
];
