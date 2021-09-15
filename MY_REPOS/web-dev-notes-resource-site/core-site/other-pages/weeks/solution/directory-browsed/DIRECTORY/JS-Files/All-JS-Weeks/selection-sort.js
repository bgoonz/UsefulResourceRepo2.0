function swap(arr, index1, index2) {
	let temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
}

function selectionSort(arr) {
	// the `i` loop will track the index that points to the first element of the unsorted region:
	//    this means that the sorted region is everything left of index i
	//    and the unsorted region is everything to the right of index i
	for (let i = 0; i < arr.length; i++) {
		let minIndex = i;

		// the `j` loop will iterate through the unsorted region and find the index of the smallest element
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[minIndex] > arr[j]) {
				minIndex = j;
			}
		}

		// after we find the minIndex in the unsorted region,
		// swap that minIndex with the first index of the unsorted region
		swap(arr, i, minIndex);
	}
	return arr;
}
