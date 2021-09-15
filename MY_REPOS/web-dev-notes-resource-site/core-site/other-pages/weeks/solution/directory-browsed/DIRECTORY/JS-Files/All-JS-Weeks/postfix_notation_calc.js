function calculate(arr) {
  let stack = [];

  for (let i = 0; i < arr.length; i++) {
    if (typeof (arr[i]) === "number") {
      stack.push(arr[i])
    } else {
      let last = stack.pop();
      let secondLast = stack.pop();
      switch (arr[i]) {
        case "+":
          stack.push(last + secondLast)
          break;
        case "-":
          stack.push(secondLast - last)
          break;
        case "*":
          stack.push(secondLast * last)
          break;
        case "/":
          stack.push(secondLast / last)
          break;
        default:
          console.log('none of the above')
      }
    }
  }
  return stack[0];
}

console.log(calculate([1, 2, "*", 3, "+", 8, 4, "-", "*"]));