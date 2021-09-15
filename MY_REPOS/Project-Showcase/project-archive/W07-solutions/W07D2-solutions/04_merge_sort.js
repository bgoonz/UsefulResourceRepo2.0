function merge(array1, array2) {
	// var result as array
	// while ( a and b have elements )
	//   if ( a[0] > b[0] )
	//     add b[0] to the end of result
	//     remove b[0] from b
	//   else
	//     add a[0] to the end of result
	//     remove a[0] from a
	//   end if
	// end while
	// while ( a has elements )
	//   add a[0] to the end of result
	//   remove a[0] from a
	// end while
	// while ( b has elements )
	//   add b[0] to the end of result
	//   remove b[0] from b
	// end while
	// return result
}

function mergeSort(array) {
	// if ( n == 1 ) return a
	// /* Split the array into two */
	// var l1 as array = a[0] ... a[n/2]
	// var l2 as array = a[n/2+1] ... a[n]
	// l1 = mergesort( l1 )
	// l2 = mergesort( l2 )
	// return merge( l1, l2 )
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


