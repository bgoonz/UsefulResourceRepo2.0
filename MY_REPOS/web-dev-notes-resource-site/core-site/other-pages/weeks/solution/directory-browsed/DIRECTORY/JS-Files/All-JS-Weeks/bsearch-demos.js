// Binary Search, Five Different Ways!
// The purpose of this document is to see that we can implement the same concepts
// multiple ways, which will impact our efficiency.

// Recursive
// Time: O(log n)
// // We are halving our array at each step, so we are making max log n recursive calls
// Space: O(n)
// // We are creating a new array at each stack frame. log n stack frames and a
// // total of n space for the arrays results in T(logn + n) = O(n)
// Visual Demo:
// [1, 2, 3, 4, 5, 6, 7, 8]
// [1, 2, 3, 4]
// [1, 2]
// [1]
// Frames created: logn
// Arrays created: n/2 + n/4 + n/8 + ... = n total space
// Total Space used: T(logn + n) = O(n)
function binarySearch(array, target) {
	// Our base case
	// If our array is empty, we do not have the target
	if (array.length === 0) {
		return false;
	}

	// Get a reference to the middle index, ie what we want to check
	let midIdx = Math.floor(array.length / 2);

	// If our target is smaller than the middle element, repeat this process with
	// the left half of our array.
	// We get a subarray that represents our left half by slicing up to but not
	// including our midIdx.
	if (target < array[midIdx]) {
		let leftHalf = array.slice(0, midIdx);
		return binarySearch(leftHalf, target);
		// If our target is larger than the middle element, repeat this process with
		// the right half of our array.
		// We get a subarray that represents our right half by slicing from the
		// midIdx + 1 all the way to the end of our array (no second argument needed).
	} else if (target > array[midIdx]) {
		let rightHalf = array.slice(midIdx + 1);
		return binarySearch(rightHalf, target);
		// If neither of these occurred, we found our element and return true.
	} else {
		return true;
	}
}

// Iterative
// Time: O(log n)
// // We are halving our array at each step, so we are making max logn iterations
// Space: O(1)
// // We are creating variables to track our lowerIdx, upperIdx, and midIdx, then
// // just reassigning those variables for each iteration. The space is independent
// // of the size of our array (always 3 variables in this implementation)
function binarySearchIter(array, target) {
	// Get a reference to our lower and upper bounds that we would like to search
	// within our array. At the start, this is the entire array, so the indices are
	// 0 and our length - 1.
	let lowerIdx = 0;
	let upperIdx = array.length - 1;
	// We also create a midIdx variable because we will reassign it at each iteration
	let midIdx;

	// While our lowerIdx <= upperIdx, we still have elements that we haven't ruled
	// out as being our target, so we want our iteration to continue.
	while (lowerIdx <= upperIdx) {
		// Get a reference to the middle element within our current bounds.
		// We are using Math.floor in order to get an integer/valid index.
		// (If we used ceiling, we would have to do some subtraction in order to get
		// our first element. For example, [14] has a length 1, so
		// Math.ceil((0 + 1)/2)) = 1, which is outside our bounds.
		midIdx = Math.floor((lowerIdx + upperIdx) / 2);
		// If our target is larger than our current middle element, our lower bound
		// needs to be moved up past our midIdx so that we look at the right half.
		if (array[midIdx] < target) {
			lowerIdx = midIdx + 1;
			// If our target is smaller than our current middle element, our upper bound
			// needs to be moved down past our midIdx so that we look at the left half.
		} else if (array[midIdx] > target) {
			upperIdx = midIdx - 1;
			// Otherwise, we have found our target at the midIdx and can return true.
		} else {
			return true;
		}
	}

	// If we made it outside of our loop without returning, our target is not in
	// the array, so we can return false.
	return false;
}

// Recursive v1
// This is the same style implementation that Alvin does in his walkthrough.
// I have a different implementation that follows which may or may not be easier
// to follow for you (not better, just different!)
// Time: O(logn)
// // We are halving the section of the array that we are considering with each
// // recursive call, meaning at most we will have log n stack frames, with a
// // constant number of calculations done in each frame.
// Space: O(logn)
// // We are not duplicating arrays at any point with this implementation, which
// // saves us memory, but we are creating stack frames, with a max of log n frames.
function binarySearchIndex(array, target, lo = 0, hi = array.length - 1) {
	// I'm adding a second condition to this base case that Alvin doesn't do. It's
	// possible that our last element of the array is the target, which would mean
	// that lo === hi, but we haven't checked that element yet.
	// This second part of the condition will only ever be evaluated when the first
	// is true, making that final check.
	// (This is an edge case that I don't think Alvin accounts for)
	if (lo === hi && array[lo] !== target) {
		return -1;
	}

	let midIdx = Math.floor((lo + hi) / 2);

	if (target < array[midIdx]) {
		return binarySearchIndex(array, target, lo, midIdx);
	} else if (target > array[midIdx]) {
		return binarySearchIndex(array, target, midIdx + 1, hi);
	} else {
		return midIdx;
	}
}

// Recursive v2
// The time/space complexities do not change
// We are doing one extra step compared to above to add the indices together if needed
// This is a constant number of calculations being added at each frame, so our
// overall O(logn) is not impacted for time and O(n) is not impacted for space
// (when compared to our original binarySearch function that returns booleans):
// Time: O(log n)
// Space: O(n)
function binarySearchIndexV2(array, target) {
	// Our base case
	// This is another way of checking if the length is 0
	// Since 0 is a falsey value, !0 would be truthy, meaning our array is empty
	// -1 here indicates that the value is not found (very common for -1 to be used
	// in these situations so that all return values are numbers)
	if (!array.length) return -1;

	// Getting a reference to our middle element for our comparisons
	const midIdx = Math.floor(array.length / 2);
	const midEl = array[midIdx];

	// If our target is less than our current middle element, we can recursively
	// call our function with the left half of the array and return that value.
	if (target < midEl) {
		return binarySearchIndexV2(array.slice(0, midIdx), target);
		// If our target is greater than our current middle element we have two scenarios
		// The first scenario, we did not find our target in the subarray (right side).
		// // In this case, we also want to return -1 to indicate that the value isn't
		// // in our array.
		// The second scenario is that we find our element in the subarray.
		// // In this case, the return value is going to be the index IN THE SUBARRAY.
		// // In order for us to be able to return what index that corresponds to in
		// // our larger original array, we need to shift this value by where this
		// // subarray starts in our larger array.
		// // Ultimately this means taking our return value and adding on our midIdx + 1
		// // Take a look at the comments below this function for an example
	} else if (target > midEl) {
		const idxShift = binarySearchIndexV2(array.slice(midIdx + 1), target);
		return idxShift === -1 ? -1 : idxShift + midIdx + 1;
		// If neither of the above cases are true, we found our element and return that
		// index (the midIdx that we compared)
	} else {
		return midIdx;
	}
}
// Using the right-side shift example:
// Array: [1, 2, 3, 4, 5], Target: 5
// The first index that we are going to compare is Math.floor(array.length/2) = 2,
// which is our element 3.
// Our target is greater than this value, so we need to check the right subarray.
// The new array is [4, 5] with the same target of 5.
// In this recursive call, the index that we are checking is Math.floor(array.length/2) = 1,
// which is our element 5.
// Since we found our element, we are hitting our last case of the conditional,
// return our index of 1 to where our recursive function was called.
// This value of 1 does not line up with the index of our original array, though,
// it was the index of our subarray.
// In order to convert this into an index that aligns with our current, larger
// array, we need to add on the amount that the indices were shifted. Our slicing
// of the subarray was acheived by taking the first three elements off. We know
// this intuitively, but it can be calculated by adding on our midIdx + 1 that
// we originally passed to our slice method.
// We end up getting our returned index from the recursion (1) added on to our
// midIdx + 1 (2 + 1), getting a final index of 4, which corresponds to where
// our element is in the larger array.
// This shifting didn't have to take place on the left side because the indices
// of the subarrays are the same as the indices of our larger array (index 1 of
// the left subarray is the same element as index 1 of the larger original).

// Iterative
// The time/space complexities do not change
// The differences here are even less compared to the recursive changes; all that
// we have to do is return the midIdx that was already calculated instead of the
// true/false boolean that we were returning.
// Time: O(log n)
// Space: O(1)
function binarySearchIndexIter(array, target) {
	// The implementation of this function is exactly the same as returning a boolean
	// Instead of returning true/false, we return the midIdx.
	// No index shifting needs to take place like in the right-side scenario above
	// because we are never making subarrays; we are only dealing with the indices
	// as they relate to the original array.
	let lowerIdx = 0;
	let upperIdx = array.length - 1;
	let midIdx;

	while (lowerIdx <= upperIdx) {
		midIdx = Math.floor((lowerIdx + upperIdx) / 2);
		if (array[midIdx] < target) {
			lowerIdx = midIdx + 1;
		} else if (array[midIdx] > target) {
			upperIdx = midIdx - 1;
		} else {
			return midIdx;
		}
	}

	return -1;
}

// binarySearch - Recursive, returns boolean
// binarySearchIter - Iterative, returns boolean
// binarySearchIndex - Recursive, returns index, uses lo and hi params
// binarySearchIndexV2 - Recursive, returns index, slices/uses subarrays
// binarySearchIndexIter - Iterative, returns index

// The following test cases show that each implementation has the same overall
// results (all of the output should match between the strings and booleans/indices
// that are returned from the functions)

console.log('false', binarySearch([ 1, 2, 3 ], 0));
console.log('true', binarySearch([ 1, 2, 3 ], 1));
console.log('true', binarySearch([ 1, 2, 3 ], 2));
console.log('true', binarySearch([ 1, 2, 3 ], 3));
console.log('false', binarySearch([ 1, 2, 3 ], 4));

console.log('false', binarySearch([ 1, 2, 3, 4 ], 0));
console.log('true', binarySearch([ 1, 2, 3, 4 ], 1));
console.log('true', binarySearch([ 1, 2, 3, 4 ], 2));
console.log('true', binarySearch([ 1, 2, 3, 4 ], 3));
console.log('true', binarySearch([ 1, 2, 3, 4 ], 4));
console.log('false', binarySearch([ 1, 2, 3, 4 ], 5));

console.log('false', binarySearchIter([ 1, 2, 3 ], 0));
console.log('true', binarySearchIter([ 1, 2, 3 ], 1));
console.log('true', binarySearchIter([ 1, 2, 3 ], 2));
console.log('true', binarySearchIter([ 1, 2, 3 ], 3));
console.log('false', binarySearchIter([ 1, 2, 3 ], 4));

console.log('false', binarySearchIter([ 1, 2, 3, 4 ], 0));
console.log('true', binarySearchIter([ 1, 2, 3, 4 ], 1));
console.log('true', binarySearchIter([ 1, 2, 3, 4 ], 2));
console.log('true', binarySearchIter([ 1, 2, 3, 4 ], 3));
console.log('true', binarySearchIter([ 1, 2, 3, 4 ], 4));
console.log('false', binarySearchIter([ 1, 2, 3, 4 ], 5));

console.log('-1', binarySearchIndex([ 1, 2, 3 ], 0));
console.log('0', binarySearchIndex([ 1, 2, 3 ], 1));
console.log('1', binarySearchIndex([ 1, 2, 3 ], 2));
console.log('2', binarySearchIndex([ 1, 2, 3 ], 3));
console.log('-1', binarySearchIndex([ 1, 2, 3 ], 4));

console.log('-1', binarySearchIndex([ 1, 2, 3, 4 ], 0));
console.log('0', binarySearchIndex([ 1, 2, 3, 4 ], 1));
console.log('1', binarySearchIndex([ 1, 2, 3, 4 ], 2));
console.log('2', binarySearchIndex([ 1, 2, 3, 4 ], 3));
console.log('3', binarySearchIndex([ 1, 2, 3, 4 ], 4));
console.log('-1', binarySearchIndex([ 1, 2, 3, 4 ], 5));

console.log('-1', binarySearchIndexV2([ 1, 2, 3 ], 0));
console.log('0', binarySearchIndexV2([ 1, 2, 3 ], 1));
console.log('1', binarySearchIndexV2([ 1, 2, 3 ], 2));
console.log('2', binarySearchIndexV2([ 1, 2, 3 ], 3));
console.log('-1', binarySearchIndexV2([ 1, 2, 3 ], 4));

console.log('-1', binarySearchIndexV2([ 1, 2, 3, 4 ], 0));
console.log('0', binarySearchIndexV2([ 1, 2, 3, 4 ], 1));
console.log('1', binarySearchIndexV2([ 1, 2, 3, 4 ], 2));
console.log('2', binarySearchIndexV2([ 1, 2, 3, 4 ], 3));
console.log('3', binarySearchIndexV2([ 1, 2, 3, 4 ], 4));
console.log('-1', binarySearchIndexV2([ 1, 2, 3, 4 ], 5));

console.log('-1', binarySearchIndexIter([ 1, 2, 3 ], 0));
console.log('0', binarySearchIndexIter([ 1, 2, 3 ], 1));
console.log('1', binarySearchIndexIter([ 1, 2, 3 ], 2));
console.log('2', binarySearchIndexIter([ 1, 2, 3 ], 3));
console.log('-1', binarySearchIndexIter([ 1, 2, 3 ], 4));

console.log('-1', binarySearchIndexIter([ 1, 2, 3, 4 ], 0));
console.log('0', binarySearchIndexIter([ 1, 2, 3, 4 ], 1));
console.log('1', binarySearchIndexIter([ 1, 2, 3, 4 ], 2));
console.log('2', binarySearchIndexIter([ 1, 2, 3, 4 ], 3));
console.log('3', binarySearchIndexIter([ 1, 2, 3, 4 ], 4));
console.log('-1', binarySearchIndexIter([ 1, 2, 3, 4 ], 5));
