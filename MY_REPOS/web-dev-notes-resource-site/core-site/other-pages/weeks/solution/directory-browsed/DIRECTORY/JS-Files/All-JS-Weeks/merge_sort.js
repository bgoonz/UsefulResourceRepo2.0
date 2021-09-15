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

// if ( n == 1 ) return a

// /* Split the array into two */
// var l1 as array = a[0] ... a[n/2]
// var l2 as array = a[n/2+1] ... a[n]

// l1 = mergesort( l1 )
// l2 = mergesort( l2 )

// return merge( l1, l2 )
// return result
function merge( array1, array2 ) {
  const newArr = [];
  while ( array1.length && array2.length ) {
    if ( array1[ 0 ] > array2[ 0 ] ) {
      newArr.push( array2[ 0 ] );
      array2.shift()
    } else {
      newArr.push( array1[ 0 ] );
      array1.shift()
    }

  }
  while ( array1.length ) {
    newArr.push( array1[ 0 ] );
    array1.shift()
  }
  while ( array2.length ) {
    newArr.push( array2[ 0 ] );
    array2.shift()
  }
  return newArr;
}
// if ( n == 1 ) return a

// /* Split the array into two */
// var l1 as array = a[0] ... a[n/2]
// var l2 as array = a[n/2+1] ... a[n]

// l1 = mergesort( l1 )
// l2 = mergesort( l2 )

// return merge( l1, l2 )

function mergeSort( array ) {
  if ( array.length <= 1 ) return array;

  const mid = Math.floor( array.length / 2 ); // 0
  let first = array.slice( 0, mid ); // slice(0,0) => []
  let last = array.slice( mid );

  let firstSort = mergeSort( first );
  let lastSort = mergeSort( last );

  return merge( firstSort, lastSort )
}

module.exports = {
  merge,
  mergeSort
};
