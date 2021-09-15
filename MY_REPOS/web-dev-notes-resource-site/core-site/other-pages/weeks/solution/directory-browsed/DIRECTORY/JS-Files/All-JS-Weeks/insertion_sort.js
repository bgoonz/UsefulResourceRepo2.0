// for i from 1 to length(list) inclusive do:

//   /* select value to be inserted */
//   valueToInsert = list[i]
//   holePosition = i

//   /* locate hole position for the element to be inserted */

//   while holePosition > 0 and list[holePosition-1] > valueToInsert do:
//     list[holePosition] = list[holePosition-1]
//     holePosition = holePosition -1
//   end while

//   /* insert the number at hole position */
//   list[holePosition] = valueToInsert

// end for
function insertionSort( list ) {
  for ( let i = 1; i < list.length; i++ ) {
    let val = list[ i ];
    let pos = i;
    while ( pos > 0 && list[ pos - 1 ] > val ) {
      list[ pos ] = list[ pos - 1 ];
      pos -= 1;

    }
    list[ pos ] = val;
  }
}
//Online algorithms are great when you're dealing with streaming data, because they can sort the data live as it is received.
module.exports = {
  insertionSort
};
