function insertionSort(arr) {
	// the `i` loop will iterate through every element of the array
	// we begin at i = 1, because we can consider the first element of the array as a
	// trivially sorted region of only one element
	// insertion sort allows us to insert new elements anywhere within the sorted region
	for (let i = 1; i < arr.length; i++) {
		// grab the first element of the unsorted region
		let currElement = arr[i];

		// the `j` loop will iterate left through the sorted region,
		// looking for a legal spot to insert currElement
		let j = i - 1;
		// keep moving left while currElement is less than the j-th element
		while (j >= 0 && currElement < arr[j]) {
			arr[j + 1] = arr[j];
			// the line above will move the j-th element to the right,
			// leaving a gap to potentially insert currElement
			// we have to remember to decrement in our while loop!
			j--;
		}
		// insert currElement into that gap
		arr[j + 1] = currElement;
	}
	return arr;
}
