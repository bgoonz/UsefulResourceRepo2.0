const asEnumeration = dictionary => Object.freeze( {
  from( value ) {
    if ( dictionary[ value ] ) {
      return dictionary[ value ];
    }
    throw Error( `Invalid enumeration value ${value}` );
  }
} );

const getEvenNumbers = limit => includeIfConditionIsMet( limit, number => number % 2 === 0 );
const getOddNumbers = limit => includeIfConditionIsMet( limit, number => number % 2 !== 0 );

const includeIfConditionIsMet = ( limit = 10, predicate ) => {
  return ( function inner( array, number ) {
    if ( number === limit ) {
      return array;
    }
    return inner( predicate( number ) ? [ ...array, number ] : array, number + 1 );
  } )( [], 1 );
};

const numbersEnumeration = asEnumeration( {
  'even': {
    getSequence: getEvenNumbers
  },
  'odd': {
    getSequence: getOddNumbers
  }
} );

const createGetSequence = type => limit => numbersEnumeration.from( type ).getSequence( limit );

const getOddNumberSequence = createGetSequence( 'odd' );
const getEvenNumberSequence = createGetSequence( 'even' );

const getTranslationInSpanish = word => {
  return 'hola';
};

const getTranslationInGerman = word => {
  return 'hallo';
};

const languageEnumeration = asEnumeration( {
  'es-es': {
    getTranslation: getTranslationInSpanish
  },
  'en-de': {
    getTranslation: getTranslationInGerman
  }
} );

const createTranslator = type => word => languageEnumeration.from( type ).getTranslation( word );

const getSpanishWord = createTranslator( 'es-es' );
const getGermanWord = createTranslator( 'en-de' );

console.log( getSpanishWord( 'hello' ) );
console.log( getGermanWord( 'hello' ) );
