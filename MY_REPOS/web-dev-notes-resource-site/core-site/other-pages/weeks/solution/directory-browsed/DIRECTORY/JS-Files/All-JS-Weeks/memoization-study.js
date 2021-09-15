//The most classical recursive problem is the factorial.


function factorial( num ) {
    if ( num === 0 ) {
        return 1;
    } else {
        return num * factorial( n - 1 );
    }
}

//Inpure:

function factorial( num ) {

    let total = 1;
    for ( i = 1; i <= num; ++i ) {
        total *= i;
    }
    return total;
}

//! Another example of a pure function:

const add = ( x, y ) => x + y;
const calculateBill =( sumOfCart, tax)=> sumOfCart * tax;


//EX.)

const memoize = fn => {
    const cache = {};
    return ( ...args ) => {
        const stringifiedArgs = JSON.stringify( args )
        const result = (cache[stringifiedArgs]=typeof cache[stringifiedArgs ===undefined])
    }
}
