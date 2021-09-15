// reverse a string in place 

function stringReversal(str) {
  let start = 0; 
  let end = str.length - 1;
  let strArr = str.split("");

  while (start < strArr.length / 2) {
    let temp = strArr[end]
    strArr[end] = strArr[start]
    strArr[start] = temp
    start++
    end--
  }
  return strArr.join("");
};

console.log(stringReversal("california"))
console.log(stringReversal("test"))
console.log(stringReversal("lisa steele"))