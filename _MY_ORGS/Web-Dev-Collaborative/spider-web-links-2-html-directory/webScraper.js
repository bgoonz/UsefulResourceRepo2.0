#!/usr/bin/env node
/* Async/Await Syntax */
// ( async () => {
//   try {
//     const result = await doSomething();
//     const newResult = await doSomethingElse( result );
//     const finalResult = await doThirdThing( newResult );
//     console.log( finalResult );
//   } catch ( err ) {
//     console.log( err );
//   }
// } )();
const fs = require( 'fs' );
const jsdo = require( "jsdo" );
const {
  jsdo
} = jsdo;
const fetch = require( 'isomorphic-fetch' );
const {
  jsdo
} = jsdo;
 async function scrape(url) {
  const response = await fetch( 'url' );
  const text = await response.text();
  const dom = await new jsdo( text );
  console.log( dom.window.document.querySelector( "a" ).textContent );
} 
scrape( "https://www.amazon.com/" )
console.log('scrape( "https://www.amazon.com/" ): ', scrape( "https://www.amazon.com/" ));
