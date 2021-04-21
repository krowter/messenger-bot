import { createQuickReply, getNextBirthday } from "../helpers";

export const messengerStates = [
  {
    id: "greeting",
    type: "regular",
    nextState: "question2",
    response: () => ({ text: "What's your name?" }),
    validation: {
      pattern: /[a-z]+/,
      errorMessage:
        "Are you James Bond? Your name must have one or more letter :)",
    },
  },
  {
    id: "question2",
    type: "regular",
    nextState: "question3",
    response: () => ({
      text: `Bots like me weren't born, we're created. What about you, when were you born?`,
    }),
    validation: {
      // MM must be <= 12
      // DD must be <= 31
      pattern: /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/,
      errorMessage:
        "I'm sorry, I didn't get that. Can you please write it in form of YYYY-MM-DD?",
    },
  },
  {
    id: "question3",
    type: "postback",
    nextState: "question4",
    response: (user) =>
      createQuickReply(
        `Would you like to know when your next birthday is, ${user.question2}?`,
        "Yes please!",
        "Nah"
      ),
    validation: {
      // valid as long as it stars with "y" or "n"
      pattern: /^(y|n)\w*/i,
      errorMessage: "Please answer using yes, no, yay, nay, yeah, etc.",
    },
  },
  {
    id: "question4",
    type: "regular",
    payloadHandler: {
      YES: (user) => {
        const daysLeftUntilNextBirthday = getNextBirthday(user.birthdate);
        const isToday =
          daysLeftUntilNextBirthday === 0 || daysLeftUntilNextBirthday === 365;

        if (isToday) {
          return {
            text: `Hey Happy Birthday! There are 365 days left until your next birthday`,
          };
        } else {
          return {
            text: `There are ${daysLeftUntilNextBirthday} days left until your next birthday.`,
          };
        }
      },
      NO: () => ({
        text: "Oh okay then. See ya",
      }),
    },
    nextState: "closing",
    validation: {
      pattern: /.+/,
      errorMessage: "I'm sorry, I didn't get that.",
    },
  },
  {
    id: "closing",
    type: "regular",
    nextState: "greeting",
    response: (user) => ({
      text: "It was nice meeting you " + user.question2 + ". Bye!",
    }),
    validation: {
      pattern: /.+/,
      errorMessage: "I'm sorry, I didn't get that.",
    },
  },
];
