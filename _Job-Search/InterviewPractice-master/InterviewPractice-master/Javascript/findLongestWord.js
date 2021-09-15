function findLongestWord(str) {
  const res = str.split(" ");

  const nums = [];

  for (i = 0; i < res.length; i++) {
    nums[i] = res[i].length;
    nums.reverse().sort((a, b) => {
      return b - a;
    });
  }

  return nums[0];
}

findLongestWord("The quick brown fox jumped over the lazy dog");
