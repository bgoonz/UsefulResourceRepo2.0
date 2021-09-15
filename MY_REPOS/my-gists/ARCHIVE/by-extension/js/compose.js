const add = ( a, b ) => a + b;
const add10 = num => add( num, 10 );
const add200 = num => add( num, 200 );
const addNew = a => b => a + b;

console.log( add( 10, 20 ) ) // 30
console.log( add10( 10 ) ) // 20
console.log( addNew( 10 )( 20 ) ) // 30
console.log( add200( 10 ) ) // 210


const compose = ( ...args ) => target => {
  return args.reduceRight( ( previousFn, currentFn ) => {
    return currentFn( previousFn );
  }, target );
};

console.log( 'output',
  compose(
    add10,
    add200,
    add200
  )( 0 )
) // 410

const addProps = props => obj => {
  return Object.assign( {}, obj, props )
};

const deleteProps = props => obj => {
  const objCopy = Object.assign( {}, obj );
  props.forEach( prop => {
    delete objCopy[ prop ]
  } );
  return objCopy;
};

console.log( 'output',
  compose(
    addProps( {
      qux: true
    } ),
    addProps( {
      baz: true
    } ),
    deleteProps( [ 'foo', 'bit' ] ),
    addProps( {
      bar: true
    } ),
    addProps( {
      bit: true
    } ),
  )( {
    foo: true
  } )
) // { bar: true, baz: true, qux: true }
