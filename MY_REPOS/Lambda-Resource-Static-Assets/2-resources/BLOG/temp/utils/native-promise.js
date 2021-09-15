function classString( obj ) {
  return {}.toString.call( obj );
}
function getNativePromise() {
  if ( typeof Promise === "function" ) {
    try {
      let promise = new Promise( function () {} );
      if ( classString( promise ) === "[object Promise]" ) {
        return Promise;
      }
    } catch ( e ) {}
  }
}
