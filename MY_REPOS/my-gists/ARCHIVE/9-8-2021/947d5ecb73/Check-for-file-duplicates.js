const Promise = require( 'bluebird' );
const fs = Promise.promisifyAll( require( 'fs' ) );
const crypto = require( 'crypto' );
const path = require( 'path' );
const pathA = ".";
const pathB = "/path/to/the/directory/you/want/to/compare/it/to";
let hashes = [];
function hashDirIn ( folder ) {
    var pathPromiseA = fs.readdirAsync( folder ).map( function ( fileName ) {
        var workPath = path.join( folder, fileName );
        var statPromise = fs.statAsync( workPath );
        return Promise.join( statPromise, fileName, function ( statPromise, fileName ) {
            if ( statPromise.isFile() ) {
                function makeStream ( file, callback ) {
                    var result = fs.createReadStream( workPath );
                    return callback( result );
                }
                function process ( stream ) {
                    var hash = crypto.createHash( 'md5' );
                    return new Promise( function ( resolve, reject ) {
                        stream.on( 'data', function updateProcess ( chunk ) {
                            hash.update( chunk, 'utf8' );
                        } );
                        stream.on( 'end', resolve );
                    } ).then( function publish () {
                        var digest = hash.digest( 'hex' );
                        hashes.push( { digest: digest, path: workPath } );
                    } );
                }
                return makeStream( fileName, process );
            }
        } );
    } ).then( function () {
        if ( i == 1 ) {
            hashes.sort( function ( a, b ) {
                if ( a.digest < b.digest ) {
                    return -1;
                }
                if ( a.digest > b.digest ) {
                    return 1;
                }
                return 0;
            } );
            var dupe = 1;
            hashes.map( function ( obj, index ) {
                if ( index - 1 >= 0 ) {
                    if ( obj.digest == hashes[ index - 1 ].digest ) {
                        console.log( "Dupe " + dupe + " found:" );
                        console.log( obj.path );
                        console.log( "Equal to:" )
                        console.log( hashes[ index - 1 ].path + "\n" );
                        dupe++;
                    }
                }
            } );
        }
        i++;
    } );
}
var i = 0;
hashDirIn( pathA );
hashDirIn( pathB );
