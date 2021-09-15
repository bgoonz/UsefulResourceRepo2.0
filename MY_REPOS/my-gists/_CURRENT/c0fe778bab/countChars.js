function charCount(inputString) {
  let res = inputString.split("").reduce(function (accum, el) {
    if (el in accum) {
      accum[el] = accum[el] + 1;
    } else {
      accum[el] = 1;
    }
    return accum;
  }, {});
  return res;
}
console.log(charCount("aaabbbeebbcdkjfalksdfjlkasdfasdfiiidkkdingds"));

