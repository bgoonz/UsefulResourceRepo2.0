const http = require( 'http' );

http
  .createServer( ( request, response ) => {
    switch ( request.url ) {
      case '/200':
        console.log( 'Inbound "OK" request being processed...' );
        response.writeHead( 200, {
          'Content-Type': 'text/html'
        } );
        response.end();
        break;

      case '/201':
        if ( request.method === 'POST' ) {
          console.log( 'Created' );
          response.writeHead( 201 );
          response.end();
        } else {
          console.log( 'Request not found being processed...' );
          response.writeHead( 404 );
          response.end();
        }
        break;
      case '/400':
        console.log( 'Bad request' );
        response.writeHead( 400 );
        response.end();
        break;
      case '/403':
        console.log( 'Forbidden' );
        response.writeHead( 403 );
        response.end();
        break;
      case '/302':
        console.log( 'Found', {
          location: './Bonus/Redirect'
        } );
        response.writeHead( 302 );
        response.end();
        break;
      case '/504':
        console.log( 'Gateway Timeout' );
        response.writeHead( 504 );
        response.end();
        break;

      case '/301':
        console.log( 'Moved Permanently ' );
        response.writeHead( 301 );
        response.end();
        break;
      case '/401':
        console.log( 'Unauthorized' );
        response.writeHead( 401 );
        response.end();
        break;
      case '/500':
        console.log( 'Interal Server Error' );
        response.writeHead( 500 );
        response.end();
        break;
      case '/Bonus/Redirect':
        console.log( 'bonus' );
        response.writeHead( 302, {
          location: '/403'
        } );
        response.end();
      case '/Bonus/Webpage':
        console.log( 'bonus' );
        response.writeHead( 200, {
          'Content-Type': 'text/html'
        } );
        response.write( '<h1>Hello, World!</h1>' );
        response.end();
      default:
        console.log( 'Request not found being processed...' );
        response.writeHead( 404 );
        response.end();
    }
  } )
  .listen( 3000, () => {
    console.log( 'Listening for request' );
  } );
