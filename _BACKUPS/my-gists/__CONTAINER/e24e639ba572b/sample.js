

const sample = arr => arr[ Math.floor( Math.random() * arr.length ) ];

//--------------------------------


sample( [ 3, 7, 9, 11 ] ); // 9

//--------------------------------


const sampleSize = ( [ ...arr ], n = 1 ) => {
  let m = arr.length;
  while ( m ) {
    const i = Math.floor( Math.random() * m-- );
    [ arr[ m ], arr[ i ] ] = [ arr[ i ], arr[ m ] ];
  }
  return arr.slice( 0, n );
};

sampleSize( [ 1, 2, 3 ], 2 ); // [3, 1]
sampleSize( [ 1, 2, 3 ], 4 ); // [2, 3, 1]