const fs = require( 'fs' );
const path = require( 'path' );
const filePath = './recursive-unzip.sh'
const newFile = './combined.md'
fs.readFile( filePath, ( err, data ) => {
    if ( err ) throw err
    fs.writeFile( newFile, data, ( err ) => {
        if ( err ) throw err
        console.log( newFile + ' saved' )
    } )
} )
