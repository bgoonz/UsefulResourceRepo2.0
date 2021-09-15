import INST from 'browser-sniffer'

class SafeString {
  constructor ( string ) {
    this.string = typeof string === 'string' ? string : `${ string }`
  }

  toString () {
    return this.string
  }
}

const ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;', // for old versions of IE
  '=': '&#x3D;' // in case of unquoted attributes
}

function htmlEscape ( str ) {
  // ideally we should wrap this in a SafeString, but this is how it has
  // always worked :-/
  return str.replace( /[&<>"'\/`=]/g, c => ENTITIES[ c ] )
}

// Escapes HTML tags from string, or object string props of `strOrObject`.
// returns the new string, or the object with escaped properties
export default function escape ( strOrObject ) {
  if ( typeof strOrObject === 'string' ) {
    return htmlEscape( strOrObject )
  } else if ( strOrObject instanceof SafeString ) {
    return strOrObject
  } else if ( typeof strOrObject === 'number' ) {
    return escape( strOrObject.toString() )
  }

  for ( const k in strOrObject ) {
    if ( strOrObject.hasOwnProperty( k ) ) {
      const v = strOrObject[ k ]
      strOrObject[ k ] = escape( v )
    }
  }
  return strOrObject
}
escape.SafeString = SafeString

// tinymce plugins use this and they need it global :(
INST.htmlEscape = escape

const UNESCAPE_ENTITIES = Object.keys( ENTITIES ).reduce( ( map, key ) => {
  const value = ENTITIES[ key ]
  map[ value ] = key
  return map
}, {} )

const unescapeSource = `(?:${ Object.keys( UNESCAPE_ENTITIES ).join( '|' ) })`
const UNESCAPE_REGEX = new RegExp( unescapeSource, 'g' )

function unescape ( str ) {
  return str.replace( UNESCAPE_REGEX, match => UNESCAPE_ENTITIES[ match ] )
}

escape.unescape = unescape
