const generateIncrementedNumbersList = ( min, max, increment, includeMin ) => {
  const items = [];
  let incrementor = Math.max( min, increment );

  if ( includeMin ) {
    items.push( min );
  }

  while ( incrementor <= max ) {
    items.push( incrementor );
    incrementor += increment;
  }

  return items;
}

console.log( generateIncrementedNumbersList( 500, 10000, 1000, true ) );
// [ 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000 ]

console.log( generateIncrementedNumbersList( 1, 100, 10, true ) );
// [ 1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ]
