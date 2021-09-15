const fs=require('fs');
let cat= require( 'child_process' ).execSync( 'cat *' ).toString( 'UTF-8' )
fs.writeFile( 'output.md', cat, ( err ) => {

  // In case of a error throw err. 
  if ( err ) throw err;
} );