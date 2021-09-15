
var str = "abc123def";
var patt1 = /[0-9]+/;
console.log(str.match(patt1));

var str = "Is is the cost of of gasoline going up up";
var patt1 = /\b([a-z]+) \1\b/ig;
console.log(str.match(patt1))