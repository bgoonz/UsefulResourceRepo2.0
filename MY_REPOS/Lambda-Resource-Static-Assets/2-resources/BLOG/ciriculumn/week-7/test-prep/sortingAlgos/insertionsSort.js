// let temp = arr[index1];
// arr[index1] = arr[index2];
//         function swap(arr, index1, index2) {
// 	arr[index2] = temp;
// }

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currElement = arr[i];
    for (var j = i - 1; j >= 0 && currElement < arr[j]; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currElement;
  }
  return arr;
}

let arr = [34, 765, 2341, 7654, 234, 0867, 324, 1234, 4565, 3425]

console.log(insertionSort(arr));