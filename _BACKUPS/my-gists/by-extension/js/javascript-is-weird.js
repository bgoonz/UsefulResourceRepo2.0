function foo(x) { x = (typeof x != "undefined") ? x : 10; .. }
function foo(x = 10) { .. }

function foo(x,y,z) { .. }; foo.apply(null,[1,2,3]);
function foo(x,y,z) { .. }; foo(...[1,2,3]);

function foo() { var args = [].slice.call(arguments); .. }
function foo(...args) { .. }

var o = { x: 2, y: 3 }, x = o.x, y = o.y, z = (typeof o.z != "undefined") ? o.z : 10;
var { x, y, z = 10 } = { x: 2, y: 3 };

var a = [1,2], x = a[0], y = a[1], z = (typeof a[2] != "undefined") ? a[2] : 10;
var [x,y,z = 10] = [1,2];

var x = 10, y = 20, tmp = x; x = y; y = tmp;
var x = 10, y = 20; [y,x] = [x,y];

var a = [1,2,3], b = a.pop(); a = a.concat([4]); a; // [2,3,4]
var a = [1,2,3], [b, ...a] = [...a,4];

function foo(o) { var x = o.x, y = o.y; .. }; foo( {y:5,x:10} );
function foo({x,y}) { .. }; foo( {y:5,x:10} );