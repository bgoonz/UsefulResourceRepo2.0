function restSum(...otherNums) {
  let sum = 0;
  console.log(otherNums);
  otherNums.forEach(function (num) {
    sum += num;
  });
  return sum;
}
console.log(restSum(3, 5, 6)); // => 14
console.log(restSum(1, 2, 3, 4, 5, 6, 7, 8, 9)); // => 45
console.log(restSum(0)); // => 0
