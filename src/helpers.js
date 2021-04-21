const milisecondsToDays = (ms) => ms / (36e5 * 24);

export const getNextBirthday = (_birthdate) => {
  const birthdate = new Date(_birthdate);
  const today = new Date();

  birthdate.setFullYear(today.getFullYear());

  const birthdayHasPassed = birthdate < today;

  if (birthdayHasPassed) {
    // skip the counting to next year's date
    birthdate.setFullYear(today.getFullYear() + 1);
  }

  return Math.round(milisecondsToDays(birthdate - today));
};

export const getState = (states, stateId) =>
  states.find(({ id }) => id === stateId);

export const createQuickReply = (message, yes, no) => {
  const response = {
    text: message,
    quick_replies: [
      {
        content_type: "text",
        title: yes,
        payload: "YES",
      },
      {
        content_type: "text",
        title: no,
        payload: "NO",
      },
    ],
  };

  return response;
};
