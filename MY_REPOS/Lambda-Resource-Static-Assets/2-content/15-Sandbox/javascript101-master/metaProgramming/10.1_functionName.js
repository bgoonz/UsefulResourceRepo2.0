var abc = function () {
    // ..
};
console.log(abc.name);


// ES6 中名称推导

// (function(){ .. }); // name:
// (function*(){ .. }); // name:
// window.foo = function(){ .. }; // name:
// class Awesome {
// constructor() { .. } // name: Awesome
// funny() { .. } // name: funny
// }
// var c = class Awesome { .. }; // name: Awesome
// var o = {
// foo() { .. }, // name: foo
// *bar() { .. }, // name: bar
// baz: () => { .. }, // name: baz
// bam: function(){ .. }, // name: bam
// get qux() { .. }, // name: get qux
// set fuz() { .. }, // name: set fuz
// ["b" + "iz"]:
// function(){ .. }, // name: biz
// [Symbol( "buz" )]:
// function(){ .. } // name: [buz]
// };
// var x = o.foo.bind( o ); // name: bound foo
// (function(){ .. }).bind( o ); // name: bound
// export default function() { .. } // name: default
// var y = new Function(); // name: anonymous
// var GeneratorFunction =
// function*(){}.__proto__.constructor;
// var z = new GeneratorFunction(); // name: anonymous
