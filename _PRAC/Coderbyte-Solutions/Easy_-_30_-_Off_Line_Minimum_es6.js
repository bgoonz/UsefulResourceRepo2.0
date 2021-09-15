function OffLineMinimum(strArr) {
  const numTest = /[0-9]/;
  const numArr = [];
  const answerArr = [];
  let lowest = 10;
  let lowestInd = 0;

  for (let i = 0; i < strArr.length; i++) {
    if (numTest.test(strArr[i])) {
      numArr.push(strArr[i]);
    } else {
      for (let j = 0; j < numArr.length; j++) {
        if (numArr[j] < lowest) {
          lowest = numArr[j];
          lowestInd = numArr.indexOf(lowest);
        }
      }
      answerArr.push(lowest);
      lowest = 10;
      numArr.splice(lowestInd, 1);
    }
  }

  return answerArr.join(",");
}
