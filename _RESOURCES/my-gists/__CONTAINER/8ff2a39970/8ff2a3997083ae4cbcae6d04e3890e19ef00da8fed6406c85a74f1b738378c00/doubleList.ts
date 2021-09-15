function doubleList(listOfNumbers: number[]): number[] {
  if(!listOfNumbers.length) return [];
  
  return [
    double(listOfNumbers[0]), 
    ...doubleList(listOfNumbers.slice(1, listOfNumbers.length))
  ];
}

function double(n: number) {
  return n * 2;
}

console.log(doubleList([1,2,3,4,5])) // [2,4,6,8,10]