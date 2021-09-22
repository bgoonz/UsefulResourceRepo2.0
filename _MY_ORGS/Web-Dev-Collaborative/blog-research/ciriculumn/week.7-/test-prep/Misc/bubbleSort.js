let arr = [546, 1234, 432132, 565, 245, 313, 6, 5, 653245, 342];


function bubbleSort(array) {
  // We could have also had a 'sorted = false' flag and flipped our logic below
  let swapped = true;

  while(swapped) {
    swapped = false;

    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i+1]) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        // The above three lines could also be in a helper swap function
        // swap(array, i, i+1);
        swapped = true;
        arr
      }
    }
  }

  return array;
}

bubbleSort(arr)