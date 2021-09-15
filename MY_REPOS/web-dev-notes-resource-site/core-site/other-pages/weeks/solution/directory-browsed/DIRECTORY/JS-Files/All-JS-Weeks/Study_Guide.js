*
//////(Use `Open File` vs code extension--->)  Test_Review\Screenshots\2020-09-19-19-28-15.png

//!Problem Statement:   
//!LO # 5.)    Write a very simple HTTP server using‘ http' in node with paths that will result in the common HTTP status codes
///
//const http = require( 'http' );
//http.createServer( function ( request, response ) {
//    if ( request.url === '/200' ) {
//        response.writeHead( 200, {
//            'Content-Type': 'text/html'
//        } );
//        response.write( '<h1>Hello, world! Status 200 OK!</h1>' );
//    } else if ( request.url === '/403' ) {
//        response.writeHead( 403, {
//            'Content-Type': 'text/html'
//        } );
//        response.write( '<h1>This is Forbidden! Status 403 Forbidden!</h1>' );
//    } else {
//        response.writeHead( 404, {
//            'Content-Type': 'text/html'
//        } );
//        response.write( '<h1>What is that? Status 404 Not Found!</h1>' );
//    }
//    response.end();
//} ).listen( 8080, function () {
//    console.log( 'Listening for requests on port 8080...' );
//} )


//!Result:
//// 2020-09-19-19-40-26.png      &    2020-09-19-19-39-33.png        &    2020-09-19-19-45-17.png
//
*/








/* 
//----------------------------------------------------------------------------------------------------------------------------------
!Problem Statement: ! LO# 6. ) Instantiate a Promise object
-The Promise takes in a callback 
#that we can invoke(with two arguments):     //-    (resolve, reject)
//* resolve is invoked when we want to indicate our function has successfully completed.
//*A value can be passed as the successful return value.
//*reject is invoked when we want to indicate that our function failed in some way.
//*A value can be passed as the fail value( what would be used in catch or the second argument to then ).
//------------------------------------------------------------------------------------------------------------------------------------*/
const myPromise = new Promise( ( resolve, reject ) => {
    /*  - We can instantiate a Promise object using the //!      new (keyword)      */
    try {
        //- try some code, if it works, then we can call `resolve()`
        //*someAsynchronousFunctionThatMightFail//
        setTimeout( ( result ) => {
            //- If the async function works, it'll call this callback   - and pass us the result of whatever it did.
            resolve( result ); //- Then we can call resolve with the result.
        }, numberOfSeconds * 1000 );
    } catch ( error ) {
        //- if we get an error we can call `reject()` with the error
        reject( error );
    }
} );
myPromise( resolve );
