function reverseString(str) {
  const arr = [];
  const reversed = str;
  for (i = 0; i < str.length; i++) {
    arr.push(str[i]);
  }
  arr.reverse();

  const joinArray = arr.join("");

  return console.log(joinArray);

}

reverseString("hello");