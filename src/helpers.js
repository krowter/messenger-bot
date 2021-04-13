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

export const storeUserData = (user = {}, eventName, message) => {
  if (eventName === "user_name") {
    user.name = message;
  }
  if (eventName === "user_birthday") {
    user.birthdate = message;
  }
  user.previousMessage = message;

  return user;
};
