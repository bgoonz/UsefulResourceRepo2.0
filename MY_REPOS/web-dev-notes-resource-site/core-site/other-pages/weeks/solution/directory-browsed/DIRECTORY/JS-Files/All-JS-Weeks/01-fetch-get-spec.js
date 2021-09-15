if ( typeof AssertionError === 'undefined' ) {
  let AssertionError = require( 'assertion-error' );
  let chai = require( 'chai' );
  let makeFetch = require( './node-fetch' )( 1, true );
  let CustomResponse = require( './response' ).Response;
  let CustomHeaders = require( './response' ).Headers;
}

if ( typeof expect === 'undefined' ) {
  expect = chai.expect;
}

describe( 'GET http://api.open-notify.org/iss-now.json', () => {
  let jsonSpy;
  let spy;
  let error;
  before( async () => {
    const response = new CustomResponse( JSON.stringify( {
      message: "success",
      iss_position: {
        latitude: "33.0036",
        longitude: "72.2221"
      },
      timestamp: 1597291944
    } ), {
      status: 200,
      statusText: 'OK',
      headers: new CustomHeaders( {
        'Content-Type': 'application/json',
      } ),
    } );
    jsonSpy = chai.spy.on( response, 'json' );

    if ( typeof makeFetch !== 'undefined' ) {
      spy = makeFetch( Promise.resolve( response ) );
    } else {
      spy = chai.spy.on( window, 'fetch', ( ...args ) => {
        return Promise.resolve( response );
      } );
    }

    if ( typeof window === 'undefined' ) {
      solution = require( '../01-fetch-get' );
      document = require( './node-dom' )( '01-fetch-get.js' );
    }

    if ( typeof getSpaceStation === 'undefined' && typeof solution !== 'undefined' ) {
      getSpaceStation = solution.getSpaceStation;
    }

    try {
      await getSpaceStation();
    } catch ( e ) {
      error = e;
    }
  } );

  after( () => {
    if ( typeof window !== 'undefined' ) {
      chai.spy.restore( window );
    }
  } );

  context( 'returns the current location of the Space Station', () => {
    it( 'that you got from using fetch GET', async () => {
      if ( error ) throw error;
      try {
        expect( spy ).to.have.been.called.with( 'http://api.open-notify.org/iss-now.json' );
      } catch ( e ) {
        throw new AssertionError( 'Expected fetch() method to have been called with "http://api.open-notify.org/iss-now.json"' )
      }
      try {
        expect( jsonSpy ).to.have.been.called.with.exactly();
      } catch ( e ) {
        throw new AssertionError( 'Expected json() to have been called on the return value of the fetch()' )
      }
    } );

    it( 'that you use to build divs for #space-station', async () => {
      if ( error ) throw error;
      const spaceStation = document.getElementById( 'space-station' );
      expect( spaceStation.innerHTML ).to.equal( 'The ISS is currently over 33.0036 Lat. and 72.2221 Lon.' );
    } );
  } );
} );
