// Flattening arrays with flat() and flatMap()
console.log( "🚀 ~ file: js.js ~ line 3 ~ [1, [2, 3]].flat()", [ 1, [ 2, 3 ] ].flat() )
console.log( "🚀 ~ file: js.js ~ line 6 ~ [1, [2, [3]]].flat()", [ 1, [ 2, [ 3 ] ] ].flat() )
let a = [ 1, [ 2, [ 3, [ 4 ] ] ] ];
console.log( "🚀 ~ file: js.js ~ line 10 ~ a.flat(1)", a.flat( 1 ) )
console.log( "🚀 ~ file: js.js ~ line 11 ~ a.flat(2)", a.flat( 2 ) )
console.log( "🚀 ~ file: js.js ~ line 13 ~ a.flat(3)", a.flat( 3 ) )
console.log( "🚀 ~ file: js.js ~ line 15 ~ a.flat(4)", a.flat( 4 ) )
let phrases = [ "hello world", "the definitive guide" ];
let words = phrases.flatMap( phrase => phrase.split( " " ) );
console.log( "WORDS:", words );
// Calling a.flatMap(f) is the same as (but more efficient than) a.map(f).flat():
// Adding arrays with concat()
let a1 = [ 1, 2, 3 ];
console.log( "🚀 ~ file: js.js ~ line 26 ~ a1.concat(4, 5)", a1.concat( 4, 5 ) )
console.log( "🚀 ~ file: js.js ~ line 28 ~ a1.concat([4,5],[6,7])", a1.concat( [ 4, 5 ], [ 6, 7 ] ) )
/*
node js.js
🚀 ~ file: js.js ~ line 3 ~ [1, [2, 3]].flat() [ 1, 2, 3 ]
🚀 ~ file: js.js ~ line 6 ~ [1, [2, [3]]].flat() [ 1, 2, [ 3 ] ]
🚀 ~ file: js.js ~ line 10 ~ a.flat(1) [ 1, 2, [ 3, [ 4 ] ] ]
🚀 ~ file: js.js ~ line 11 ~ a.flat(2) [ 1, 2, 3, [ 4 ] ]
🚀 ~ file: js.js ~ line 13 ~ a.flat(3) [ 1, 2, 3, 4 ]
🚀 ~ file: js.js ~ line 15 ~ a.flat(4) [ 1, 2, 3, 4 ]
WORDS: [ 'hello', 'world', 'the', 'definitive', 'guide' ]
🚀 ~ file: js.js ~ line 26 ~ a1.concat(4, 5) [ 1, 2, 3, 4, 5 ]
🚀 ~ file: js.js ~ line 28 ~ a1.concat([4,5],[6,7]) [
1, 2, 3, 4,
5, 6, 7
]
*/
