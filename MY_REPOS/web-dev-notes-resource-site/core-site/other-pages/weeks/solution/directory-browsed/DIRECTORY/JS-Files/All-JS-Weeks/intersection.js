// Given two arrays, write a function to compute their intersection.
const intersect = function(nums1, nums2) {
	const memo = createMemo(nums1);
	const number = findIntersect(nums2, memo);

	return number;
};

// Given an array and an object with elements mapping to frequencies, return
const findIntersect = function(arr, obj) {
	const result = [];

	// for each element in our array, check to see if our mapping made from the other array has unaccounted for instances of this element
	// if it does, add it into the result array and decrement our count of remaining instances in the object
	// after we've gone through this array, the result should contain only the elements that appeared in both arrays, with multiple instances being distinct
	for (let i = 0; i < arr.length; i++) {
		if (obj[arr[i]]) {
			result.push(arr[i]);
			obj[arr[i]]--;
		}
	}
	return result;
};

// counting how many times each element exists in the array
const createMemo = function(arr) {
	const obj = {};

	// for each element in the array, if we've already encountered it, increment the count
	// if we haven't encountered it, set the value to 1
	// the end result is an object with keys for each element and values for the number of times that element appeared
	for (let i = 0; i < arr.length; i++) {
		const curEl = arr[i];
		if (obj[curEl]) {
			obj[curEl]++;
		} else {
			obj[curEl] = 1;
		}
	}

	return obj;
};

console.log(intersect([ 1, 1, 1, 2, 3, 5 ], [ 1, 1, 3, 4 ]));
