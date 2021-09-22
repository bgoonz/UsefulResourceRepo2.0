export const randomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const checkGuess = (num, secret) => {
  if (num > secret) {
    return 2;
  } else if (num < secret) {
    return 1;
  }
  return 0;
};
