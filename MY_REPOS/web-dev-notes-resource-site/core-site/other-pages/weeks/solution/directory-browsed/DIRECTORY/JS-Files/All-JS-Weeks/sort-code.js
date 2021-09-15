//----------Bubble Sort----------------------------------------------------------------
function bubbleSort( array ) {
    let swapped = true;
    while ( swapped ) {
        swapped = false; // reset swap to false
        // this for will perform a single pass
        for ( let i = 0; i < array.length; i++ ) {
            // if the two value are not ordered...
            if ( array[ i ] > array[ i + 1 ] ) {
                // swap the two values
                swap( array, i, i + 1 );
                // since you made a swap, remember that you did so
                // b/c we should perform another pass after this one
                swapped = true;
            }
        }
    }
    return array;
}

// O(n^2) time complexity
// O(1) space complexity

//---------------Selection Sort------------------------
function selectionSort( arr ) {
    for ( let i = 0; i < arr.length; i++ ) {
        let minIndex = i;
        for ( let j = i + 1; j < arr.length; j++ ) {
            if ( arr[ minIndex ] > arr[ j ] ) {
                minIndex = j;
            }
        }
        swap( arr, i, minIndex );
    }
    return arr;
}
// O(n^2) polynomial/quadratic time complexity
// O(1) constant space complexity

// quadratic means n^2
// polynomial means n^m where m > 1

//----------------Insertion Sort----------------------------------------------------------------
function insertionSort( arr ) {
    for ( let i = 1; i < arr.length; i++ ) {
        let currElement = arr[ i ];
        for ( var j = i - 1; j >= 0 && currElement < arr[ j ]; j-- ) {
            arr[ j + 1 ] = arr[ j ];
        }
        arr[ j + 1 ] = currElement;
    }
    return arr;
}
// O(n^2) time complexity
// O(n) time complexity best case if almost already sorted
// O(1) space complexity (no new memory allocation)

//--------------------Merge Sort------------------------
function merge( array1, array2 ) { // assuming they are sorted arr1 = [] arr2 = [5,6,7]
    let merged = []; // [2, 4, 5, 6, 7]

    while ( array1.length && array2.length ) {
        let ele1 = array1[ 0 ];
        let ele2 = array2[ 0 ];

        let next;
        if ( ele1 < ele2 ) {
            next = array1.shift();
        } else {
            next = array2.shift();
        }
        merged.push( next );
    }
    return merged.concat( array1, array2 );
}
// calling mergeSort log(n) times
// per mergeSort, making how much space? O(n)
// per mergeSort, how many operations we are making? O(n)
function mergeSort( array ) {
    if ( array.length <= 1 ) {
        return array;
    }
    let midIdx = Math.floor( array.length / 2 );
    let leftHalf = array.slice( 0, midIdx );
    let rightHalf = array.slice( midIdx );

    let sortedLeft = mergeSort( leftHalf );
    let sortedRight = mergeSort( rightHalf );

    return merge( sortedLeft, sortedRight );
}
// O(n * logn) time AND space complexity // quasilinear
//---------------Quick Sort---------------
function quickSort( array ) { // n is the length of the input array
    if ( array.length <= 1 ) {
        return array;
    }
    let pivot = array.shift();
    let left = array.filter( el => el < pivot ); // O(n) linear
    let right = array.filter( el => el >= pivot );

    let leftSorted = quickSort( left ); // O(log n) best case - O(n) worst case
    let rightSorted = quickSort( right );

    return [ ...leftSorted, pivot, ...rightSorted ]; // O(n) linear
}
// O(n log n) time complexity best case
// O(n^2) time complexity worst case - when all the elements are sorted already
// O(n log n) space complexity best case FOR OUR IMPLEMENTATION
// O(n^2) space complexity worse case FOR OUR IMPLEMENTATION

// O(log n) space complexity for IN-PLACE QUICKSORT (BEST IMPLEMENTATION)

// pivot = 3
// array = [4,2,5]
// left = [2]
// right = [4,5]

// O((3n^2*(logn)) - 2n - 5) === O(n^2 * logn)

//-----------------Binary Search------------------------

function binarySearch( array, target ) {
    if ( array.length === 0 ) {
        return false;
    }

    let midIdx = Math.floor( array.length / 2 );

    if ( target < array[ midIdx ] ) {
        let leftHalf = array.slice( 0, midIdx );

        return binarySearch( leftHalf, target );
    } else if ( target > array[ midIdx ] ) {
        let rightHalf = array.slice( midIdx + 1 );

        return binarySearch( rightHalf, target );
    } else {
        return true;
    }
}

// 
// O(logn) logarithmic time complexity
// O(1) space complexity
