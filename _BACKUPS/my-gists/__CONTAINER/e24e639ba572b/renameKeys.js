
const renameKeys = ( keysMap, obj ) =>
  Object.keys( obj ).reduce(
    ( acc, key ) => ( {
      ...acc,
      ...{
        [ keysMap[ key ] || key ]: obj[ key ]
      }
      } ), {}
  );

//--------------------------------


const obj = {
  name: 'Bobo',
  job: 'Front-End Master',
  shoeSize: 100
};
renameKeys( {
  name: 'firstName',
  job: 'passion'
}, obj );
// { firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 }

//--------------------------------