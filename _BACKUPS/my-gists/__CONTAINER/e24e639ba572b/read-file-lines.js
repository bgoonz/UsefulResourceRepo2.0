
const fs = require( 'fs' );

const readFileLines = filename =>
  fs
  .readFileSync( filename )
    .toString( 'UTF8' )
    .split( '\n' );

/*
contents of test.txt :
  line1
  line2
  line3
  ___________________________
*/
let arr = readFileLines( 'test.txt' );
console.log( arr ); // ['line1', 'line2', 'line3']