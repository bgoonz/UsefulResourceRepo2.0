const factorialOf = (integer) => {
  let factorial = 1;

  for (let i = 1; i <= integer; i++) {
    factorial *= i;
  }

  return factorial;
};
console.log(factorialOf(2)); // 2
console.log(factorialOf(5)); // 120
console.log(factorialOf(4)); // 24
//---Recursive:
function factorialize(num) {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return num * factorialize(num - 1);
  }
}
factorialize(5);
