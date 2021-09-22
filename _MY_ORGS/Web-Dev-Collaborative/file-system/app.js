'use strict';

//var lib = require('require-dir-all')(
var lib = require( './require.js' )( // as this demo is the part of package itself, require index file of the package
  'lib', {
    recursive: true,
    excludeDirs: /^excluded.*$/
  }
);

console.log( 'lib:', JSON.stringify( lib, null, 2 ) );

/*

Output:

lib: {
  "dir.a.b.c": {
    "module5": "string exported from module 5"
  },
  "dir1": {
    "dir2": {
      "module4": "string exported from module 4"
    },
    "module3": "string exported from module 3"
  },
  "module1": "string exported from module 1",
  "module2": "string exported from module 2"
}

*/

// Iterate through all the lib

var iterate = function ( lib ) {
  for ( var m in lib ) {
    if ( lib.hasOwnProperty( m ) ) {
      if ( typeof lib[ m ] === 'string' ) {
        console.log( 'module:', m, '; exports:', lib[ m ] );
      } else {
        console.log( 'subdir:', m );
        iterate( lib[ m ] );
      }
    }
  }
};
iterate( lib );
