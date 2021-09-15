let frequency = {};
for ( let letter of "mississippi" ) {
  if ( frequency[ letter ] ) {
    frequency[ letter ]++;
  } else {
    frequency[ letter ] = 1;
  }
}
//MAP

let m = new Map( [
  [ 1, "one" ]
] );
for ( let [ key, value ] of m ) {
  key // => 1
  value // => "one"
}
