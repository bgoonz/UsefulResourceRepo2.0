const arr = ['mom', 'dad', 'abcde', 'racecar', 'momom'];

function namePalindrome(arr) {
  return arr.filter((curr, idx, arr) => {
    const splitArr = curr.split('');
    const reversedString = splitArr.reduceRight((prev, curr) => ( prev + curr ), '');
    if (curr === reversedString) return curr;
  })
}

namePalindrome(arr);