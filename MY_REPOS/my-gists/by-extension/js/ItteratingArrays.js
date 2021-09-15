// Iterating Arrays
// The easiest way to loop through each of the elements of an array (or any iterable object) is with the for/ofloop
let letters = [ ..."Hello world" ];
let string = "";
for ( let letter of letters ) {
  string += letter;
}
// It has no special behavior for sparse arrays and simply returns undefined for any array elements that do not exist.
// If you want to use a for/of loop for an array and need to know the index of each array element, use the entries() method of the array
let letters = [ ..."Hello world" ];
let everyother = "";
for ( let [ index, letter ] of letters.entries() ) {
  if ( index % 2 === 0 ) everyother += letter;
}
// Another good way to iterate arrays is with forEach(). This is not a new form of the for loop, but an array method that offers a functional approach to array iteration.
let letters = [ ..."Hello world" ];
let uppercase = "";
letters.forEach( letter => {
  uppercase += letter.toUpperCase();
} );
// You can also loop through the elements of an array with a for loop.
for ( let i = 0, len = letters.length; i < len; i++ ) {
  // loop body
}
// Multidimensional Arrays
// Create a multidimensional array
let table = new Array( 10 );
for ( let i = 0; i < table.length; i++ ) {
  table[ i ] = new Array( 10 );
}
for ( let row = 0; row < table.length; row++ ) {
  for ( let col = 0; col < table[ row ].length; col++ ) {
    table[ row ][ col ] = row * col;
  }
}
