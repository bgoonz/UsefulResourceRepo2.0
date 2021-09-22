function checkArmstrong(num) {
  let digits = num.toString().split("");
  let sum = 0;
  digits.forEach((value) => {
    sum += Math.pow(value, digits.length);
  });
  return sum === num;
}

console.log(checkArmstrong(153));
