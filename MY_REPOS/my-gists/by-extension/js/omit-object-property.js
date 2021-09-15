const omit = ( object, key ) => {
  const objectCopy = Object.assign( {}, object );
  Object.keys( objectCopy ).forEach( itemKey => {
    if ( key === itemKey ) {
      delete objectCopy[ itemKey ];
    }
  } )
  return objectCopy;
};

const justins = {
  '1': {
    id: 1,
    name: 'Justin Bieber'
  },
  '2': {
    id: 2,
    name: 'Justin Timberlake'
  },
  '3': {
    id: 3,
    name: 'Justin Time'
  }
}

const lessJustins = omit( justins, '1' );
// {
// '2': {id: 2, name: 'Justin Timberlake'},
// '3': {id: 3, name: 'Justin Time'}
// }
const oneJustin = omit( lessJustins, '2' ); // { '3': {id: 3, name: 'Justin Time'} }
