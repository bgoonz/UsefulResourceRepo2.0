const chars = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const pickChar = () => chars[Math.floor(Math.random() * chars.length - 1)];

export const shortId = (length = 6) => {
  let str = "";
  for (let index = 0; index < length; index++) {
    str += pickChar();
  }
  return str;
};
