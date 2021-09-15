let a = [ 1, 2, 3 ];
a.map( x => x * x )
let a1 = [ 5, 4, 3, 2, 1 ];
a1.filter( x => x < 3 )
a1.filter( ( x, i ) => i % 2 === 0 )
let a2 = [ 1, 2, 3, 4, 5 ];
a2.findIndex( x => x === 3 )
a2.find( x => x % 5 === 0 )
a2.find( x => x % 7 === 0 )
let a3 = [ 1, 2, 3, 4, 5 ];
a3.every( x => x < 10 )
a3.some( x => x % 2 === 0 )
a3.some( isNaN )
let a4 = [ 1, 2, 3, 4, 5 ];
a4.reduce( ( x, y ) => x + y, 0 )
a4.reduce( ( x, y ) => x * y, 1 )
a4.reduce( ( x, y ) => ( x > y ) ? x : y )
console.log( "a:", a, '\n', "a1:", a1, '\n', "a2:", a2, '\n', "a3:", a3, '\n', "a4:", a4 )
/*
a: [ 1, 2, 3 ] 
 a1: [ 5, 4, 3, 2, 1 ] 
 a2: [ 1, 2, 3, 4, 5 ] 
 a3: [ 1, 2, 3, 4, 5 ] 
 a4: [ 1, 2, 3, 4, 5 ]
*/
