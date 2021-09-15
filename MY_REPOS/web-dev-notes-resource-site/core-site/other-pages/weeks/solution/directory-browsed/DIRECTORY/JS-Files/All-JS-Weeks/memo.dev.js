"use strict";

//const memoizedAdd = () => { // constant time complexity because the number of calculations does not depend on the size of the input.
//    let cache = {};
//    return ( n ) => {
//        if ( n in cache ) {
//            console.log( "fetching from cache" )
//            return cache[ n ];
//        } else {
//            console.log( "calculating result" );
//            let result = n + 10;
//            cache[ n ] = result;
//            return result;
//        }
//    }
//}
//const newAdd = memoizedAdd(); // closure 
//console.log( 'Invoking newAdd(9) for the first time' );
//console.log( newAdd( 9 ) );
//console.log( 'Invoking newAdd(9) for the second time' );
//console.log( newAdd( 9 ) );

/*
Invoking newAdd( 9 ) for the first time
calculating result
19
Invoking newAdd( 9 ) for the second time
fetching from cache
19
*/
//closing over a cache
var memoizedFactorial = function memoizedFactorial() {
  var cache = {
    0: 1
  };

  var fact = function fact(n) {
    if (n in cache) {
      console.log(n, 'fetching factorial from cache');
      return cache[n];
    } else {
      console.log("result of fact of ".concat(n));
      var result = n * fact(n - 1); //1 up to n recursive 

      cache[n] = result;
      return result;
    }
  };

  return fact;
};

var factorialCalc = memoizedFactorial();