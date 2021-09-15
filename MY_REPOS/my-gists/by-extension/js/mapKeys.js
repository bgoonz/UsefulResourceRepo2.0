const mapKeys = ( collection, rootKey ) => {
  const obj = {};
  collection.forEach( item => {
    obj[ item[ rootKey ] ] = item;
  } );
  return obj;
};

const justins = [ {
  id: 1,
  name: 'Justin Bieber'
}, {
  id: 2,
  name: 'Justin Timberlake'
}, {
  id: 3,
  name: 'Justin Time'
} ];

mapKeys( justins, 'id' );

// {
//  1: {id: 1, name: 'Justin Bieber'},
//  2: {id: 2, name: 'Justin Timberlake'},
//  3: {id: 3, name: 'Justin Time'}
//}
