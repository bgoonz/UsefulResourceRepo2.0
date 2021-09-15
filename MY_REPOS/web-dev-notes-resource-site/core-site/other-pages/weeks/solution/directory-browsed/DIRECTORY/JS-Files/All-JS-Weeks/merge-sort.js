// We are continually breaking down our arrays in half unti we have individual
// arrays of length 1 or 0, which are inherently sorted.
// When we have a left half and a right half that themselves are sorted, we can
// merge them together.
function mergeSort(array) {
	if (array.length <= 1) {
		return array;
	}

	let midIdx = Math.floor(array.length / 2);
	let leftHalf = array.slice(0, midIdx);
	let rightHalf = array.slice(midIdx);

	let sortedLeft = mergeSort(leftHalf);
	let sortedRight = mergeSort(rightHalf);

	return merge(sortedLeft, sortedRight);
}

// The merge function looks at first element of each array and pushes the smaller
// element into the merged collection.
// This process continues, taking the smaller of the two options at each step,
// until all elements have been added.
// This first version of merge loops until one of the arrays is empty, then adds
// on any remaining elements from the arrays to the end of the merged array.
// The second version will use Infinity as a value if one of the arrays is empty
// to make sure the element from the other array is added in.
// Both implementations will get the exact same end result. (The first implementation
// makes a little bit more sense to me because the leftover values have to be greater,
// meaning we can just tack them on to the end. Comparing to Infinity can get
// confusing, so I personally like the other approach.)
function merge(array1, array2) {
	let merged = [];

	while (array1.length && array2.length) {
		let next;
		if (ele1 < ele2) {
			next = array1.shift();
		} else {
			next = array2.shift();
		}
		merged.push(next);
	}

	return merged.concat(...array1, ...array2);
}

function merge(array1, array2) {
	let merged = [];

	while (array1.length || array2.length) {
		let ele1 = array1.length ? array1[0] : Infinity;
		let ele2 = array2.length ? array2[0] : Infinity;

		let next;
		if (ele1 < ele2) {
			next = array1.shift();
		} else {
			next = array2.shift();
		}

		merged.push(next);
	}

	return merged;
}
