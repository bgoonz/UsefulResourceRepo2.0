// 8. Determine if a number is a power of two.
// powerOfTwo(1); // true
// powerOfTwo(16); // true
// powerOfTwo(10); // false
let powerOfTwo = function ( n ) {
    if ( n === 0 ) return false;
    if ( n === 1 ) return true;
    if ( n % 2 !== 0 ) {
        return false;
    }
};
