import { getNextBirthday } from "../helpers";

export const handlers = [
  {
    eventName: "user_name",
    validation: {
      pattern: /[a-z]+/,
      errorMessage:
        "Are you James Bond? Your name must have one or more letter :)",
    },
    response: {
      nextEvent: "user_birthday",
      message: (user) =>
        `Bots like me weren't born, we're created. What about you ${user.name}, when were you born?`,
    },
  },
  {
    eventName: "user_birthday",
    validation: {
      // MM must be <= 12
      // DD must be <= 31
      pattern: /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/,
      errorMessage:
        "I'm sorry, I didn't get that. Can you please write it in form of YYYY-MM-DD?",
    },
    response: {
      nextEvent: "user_next-birthday-when",
      message: (user) =>
        `Would you like to know when your next birthday is, ${user.name}?`,
    },
  },
  {
    eventName: "user_next-birthday-when",
    validation: {
      // valid as long as it stars with "y" or "n"
      pattern: /^(y|n)\w*/i,
      errorMessage: "Please answer using yes, no, yay, nay, yeah, etc.",
    },
    response: {
      nextEvent: "user_goodbye",
      message: (user) => {
        if (user.previousMessage.toLowerCase().startsWith("y")) {
          const daysLeftUntilNextBirthday = getNextBirthday(user.birthdate);
          const isToday =
            daysLeftUntilNextBirthday === 0 ||
            daysLeftUntilNextBirthday === 365;

          if (isToday) {
            return `Hey Happy Birthday! There are 365 days left until your next birthday`;
          } else {
            return `There are ${getNextBirthday(
              user.birthdate
            )} days left until your next birthday.`;
          }
        } else {
          return `It was nice meeting you ${user.name}. See ya later!`;
        }
      },
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
      message: (user) =>
        `Bye ${user.name}! Please refresh this page to start again.`,
    },
  },
];
