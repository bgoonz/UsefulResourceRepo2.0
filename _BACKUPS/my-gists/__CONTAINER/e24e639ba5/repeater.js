
const repeatGenerator = function* ( val ) {
  let v = val;
  while ( true ) {
    let newV = yield v;
    if ( newV !== undefined ) v = newV;
  }
};

//--------------------------------


const repeater = repeatGenerator( 5 );
repeater.next(); // { value: 5, done: false }
repeater.next(); // { value: 5, done: false }
repeater.next( 4 ); // { value: 4, done: false }
repeater.next(); // { value: 4, done: false }

//--------------------------------
