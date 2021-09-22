let fs = require( 'fs' );
let util = require( 'util' );
let log_file = fs.createWriteStream( __dirname + 'consoleOutput.txt', {
  flags: 'w'
} );
let log_stdout = process.stdout;

console.log = function ( d ) { //
  log_file.write( util.format( d ) + '\n' );
  log_stdout.write( util.format( d ) + '\n' );
};


