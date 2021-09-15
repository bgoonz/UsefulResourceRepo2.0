const testString = "joke==funny ? joke==acceptable ? laugh() : doNothing() : smile()";
document.getElementsByClassName( "form-control" )[ 0 ].value = testString;
document.getElementById( "convert" ).addEventListener( "click", () => { convert(); } );

function convert () {
  console.log( "Convert" );
  text = document.getElementsByClassName( "form-control" )[ 0 ].value;
  console.log( text );
  document.getElementsByClassName( "form-control" )[ 1 ].value = toIf( text );
}
function toIf ( str ) {
  //question  = str.match(/[\?|:]/g).toString().replace(/,/g,"");
  let num = 0;

  function getPart ( str, partNumber ) {
    const questionsAndColons = []; // array for loop;
    let piece = ""; // Return Value
    for ( let i = 0; i < str.length; i++ ) {
      const cur = str[ i ];
      if ( cur == "?" ) questionsAndColons.push( cur );
      else if ( cur == ":" ) {
        questionsAndColons.pop();
        if ( questionsAndColons.length === 0 ) {
          firstElse = str.substring( str.indexOf( "?" ) + 2, i - 1 );
          lastElse = str.substring( i + 2 );
          break;
        }
      }
    }
    if ( partNumber === 1 ) piece = str.substring( 0, str.indexOf( "?" ) - 1 );
    if ( partNumber === 2 ) piece = firstElse;
    if ( partNumber === 3 ) piece = lastElse;
    console.log( partNumber + piece );

    num++;// This is to prevent infinite loops
    if ( num < 100 ) return wreckTheTern( piece );

  }

  function wreckTheTern ( str ) {
    if ( !str.includes( "?" ) ) {
      return str;
    } else {
      return `if (${ getPart( str, 1 ) }){\n${ getPart( str, 2 ) };\n}else {\n${ getPart( str, 3 ) };\n}`;
    }
  }

  return wreckTheTern( str );
}
