//add a new content-security-policy to the page
function addTag( content ) {
  var meta = document.createElement( 'meta' );
  meta.httpEquiv = "Content-Security-Policy";
  meta.content = content
  document.getElementsByTagName( 'head' )[ 0 ].appendChild( meta );
}

//try to add a <script> tag
function addScript( src ) {
  var s = document.createElement( 'script' );
  s.setAttribute( 'src', src );
  s.onload = () => {
    console.log( nlp )
  }
  document.body.appendChild( s );
}

//try a remote origin first...
addScript( "https://unpkg.com/compromise" )

//ok it should have worked..
setTimeout( () => {
  //add a origin security policy
  addTag( "default-src 'self' https://*.mydomain.com" )
  //try it again
  addScript( "https://unpkg.com/compromise" )
}, 2000 )
