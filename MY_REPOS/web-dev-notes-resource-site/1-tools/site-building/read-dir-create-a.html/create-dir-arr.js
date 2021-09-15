var fs = require( 'fs' ); // import file system
var path = require( 'path' ); //import path, used to resolve file path

var dir = './' ; // DIr path were you want to search the xml file
var xmlFile = []; //Array in which xml file will be stored
logFileSystem( dir );

// Recursively checks for xml 
function logFileSystem( dirPath ) {
  //Read the firectory
  fs.readdir( dirPath, function ( err, files ) {
    if ( err ) {
      console.log( "Could not read dir", err );
      return;
    }
    //Loop through each file
    files.forEach( function ( file, index ) {
      var filePath = path.join( dirPath, file );
      fs.stat( filePath, function ( err, stat ) {
        if ( err ) {
          console.log( "Error stating file", err );
        }
        if ( stat.isFile() ) {
          if ( filePath.endsWith( "xml" ) ) {
            console.log( "This is xml file = ", filePath )
            xmlFile.push( filePath )
          }


        }
        // If directory call the api again recursively
        if ( stat.isDirectory() ) {
          logFileSystem( filePath );
        }
      } )
    } )
  } )

}
