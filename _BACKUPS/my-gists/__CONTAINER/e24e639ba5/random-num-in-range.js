const randomIntegerInRange = ( min, max ) =>
  Math.floor( Math.random() * ( max - min + 1 ) ) + min;

//--------------------------------


randomIntegerInRange( 0, 5 ); // 2

//--------------------------------


const randomNumberInRange = ( min, max ) => Math.random() * ( max - min ) + min;

//--------------------------------


randomNumberInRange( 2, 10 ); // 6.0211363285087005

//--------------------------------