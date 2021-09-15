let data = [ 1, 2, 3, 4, 5 ];
  let sum = 0;
data.forEach( value => {
  sum += value;
} );
data.forEach( function ( v, i, a ) {
  a[ i ] = v + 1;
} );

console.log("🚀 data", data, "sum" ,sum)
//🚀 data [ 2, 3, 4, 5, 6 ] sum 15
