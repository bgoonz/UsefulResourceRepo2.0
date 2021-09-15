
const quickSort = arr => {
  if (arr.length <= 1) return arr;

  const pivot = arr.shift();
  const leftSlice = arr.filter(n => n < pivot)
  const rightSlice = arr.filter(n => n >= pivot)

  const leftSorted = quickSort(leftSlice);
  const rightSorted = quickSort(rightSlice);

  return [...leftSorted, pivot, ...rightSorted]
}

let arr = [5, 2, 3, 1, 7, 9, 0, 6, 8];

let sorted = quickSort(arr);


const missingValue = arr => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] !== arr[i] + 1) {
      return arr[i] + 1
    }
  }
  return null
}

console.log(missingValue(sorted));