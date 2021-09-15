//!Question # 1.): What is the value of `foo`?
//* --------------------------------⇓(Code)⇓--------------------------------\\
let foo = 10 + '20';
console.log('foo: ', foo);
//* --------------------------------⇑(Code)⇑--------------------------------\\
// @ RESULT:
/*
foo: 1020 |
 
*/

//-===================END====================\\

//!Question # 2.): What will be the output of the code below?
//* --------------------------------⇓(Code)⇓--------------------------------\\
console.log('0.1 + 0.2 == 0.3: ', 0.1 + 0.2 == 0.3);
//* --------------------------------⇑(Code)⇑--------------------------------\\
// @ RESULT:
/*
0.1 + 0.2 == 0.3: false 
*/

//-===================END====================\\





//!Question # 3.): What is the value of `foo`?
//* --------------------------------⇓(Code)⇓--------------------------------\\

let foo1 = 10 + '20';
console.log('foo1: ', foo1);


//* --------------------------------⇑(Code)⇑--------------------------------\\

// @ RESULT:
/*
foo1: 1020
*/

////-===================END====================\\
 
//!Question # 4.): What will be the output of the code below?
//* --------------------------------⇓(Code)⇓--------------------------------\\

console.log(0.1 + 0.2 == 0.3);




// @ RESULT:
/*

*/

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\


// 
// 
// //!Question # 5.): How would you make this work?
// //* --------------------------------⇓(Code)⇓--------------------------------\\
// add(2,5)//7
// add(2)(5)//7
// 
// //---------------------Attempt1---------------------------------------
// // function add1( a, b ) {
// //   if ( !b ) {
// //     return a;
// //   }
// //   return a + b;
// // }
// // console.log( add1( 2, 3 ) ); // 5
// // console.log( add1( 2, 3, 4 ) ); // 9
// // console.log( add1( 2, 3, 4, 5 ) ); // 14
// // console.log( 'add1( 2, 5 ): ', add1( 2, 5 ) );
// // console.log( ' add1( 2 )( 5 ): ', add1( 2 )( 5 ) );
// //---------------------Attempt2-------------------------------------------
// /*
// The arguments object is a local variable available within all non - arrow functions.You can refer to a
// function 's arguments inside that function by using its arguments object. It has entries for each argument the function was called with, with the first entry'
// s index at 0.
// Essentially, this allows us to access all the arguments passed into a particular
// function.Since we can access the length of this' arguments' object, we can create a simple loop to
// return the sum of all given arguments.
//  */
// function add2() {
//   let add2 = 0;
//   for ( let i = 0; i < arguments.length; i++ ) {
//     add2 += arguments[ i ];
//   }
//   return add2;
// }
// console.log( add2( 2, 3 ) );
// console.log( add2( 2, 3, 4 ) );
// console.log( add2( 2, 3, 4, 5 ) );
// console.log( 'add2( 2, 5 ): ', add2( 2, 5 ) );
// console.log( ' add2( 2 )( 5 ): ', add2( 2 )( 5 ) );
// //------------------Attempt3-ish----------------------------------------------
// /*
// Arrow Functions
// As mentioned in the MDN reference above, the' arguments' object is not available to us when we are using arrow functions.Arrow functions do,
//   however, allow you to accept any number of arguments.Instead of an' arguments' object, we can refer to a' rest' parameter.This must be used in conjunction with the spread operator, but the parameter can be assigned any name you' d like to use.For this
// function, I' m calling it' args.'
// */
// const add3 = ( ...args ) => {
//   let add3 = 0;
//   for ( let i = 0; i < args.length; i++ ) {
//     add3 += args[ i ];
//   }
//   return add3;
// };
// console.log( add3( 2, 3 ) ); // 5
// console.log( add3( 2, 3, 4 ) ); // 9
// console.log( add3( 2, 3, 4, 5 ) ); // 14
// console.log( 'add3( 2, 5 ): ', add3( 2, 5 ) );
// console.log( ' add3( 2 )( 5 ): ', add3( 2 )( 5 ) );
// //----------------------------Attempt4-----------------------------------
// function add() {
//   let add = function ( a, b ) {
//       return a + b;
//     },
//     value = Array.prototype.reduce.call( arguments, add, 0 );
// 
//   function f() {
//     value = Array.prototype.reduce.call( arguments, add, value );
//     return f;
//   };
//   f.toString = function () {
//     return value;
//   };
//   return f;
// }
// console.log( add( 5, 5 ) );
// console.log( add( 5 )( 5 ) );
// console.log( add( 3, 4, 5 )( 6, 7 ) );
// console.log( ' add( 2, 3 ) : ', add( 2, 3 ) );
// console.log( 'add( 2, 3, 4 ) : ', add( 2, 3, 4 ) );
// console.log( ' add( 2, 3, 4, 5 ) : ', add( 2, 3, 4, 5 ) );
// console.log( 'add( 2, 5 ): ', add( 2, 5 ) );
// console.log( ' add( 2 )( 5 ): ', add( 2 )( 5 ) );
// add(2, 5); // 7
// add(2)(5); // 7
// 
// //ANS:
// 
// 
// 
// // @ RESULT:
// /*
// 
// */
// 
// //-===================END====================\\
// 
// 
// 
// 
// //* --------------------------------⇓(Code)⇓--------------------------------\\
// 
// 
// 
// 
// //!Question # 6.): What value is returned from the following statement?
// //* --------------------------------⇓(Code)⇓--------------------------------\\
// 
// "i'm a lasagna hog".split("").reverse().join("");
// 
// 
// 

// @ RESULT:
/*

*/

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 7.): What is the value of `window.foo`?
//* --------------------------------⇓(Code)⇓--------------------------------\\

( window.foo || ( window.foo = "bar" ) );




// @ RESULT:
/*

*/

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 8.): What is the outcome of the two alerts below?
//* --------------------------------⇓(Code)⇓--------------------------------\\

let foo2 = "Hello";
(function() {
  var bar = " World";
  alert(foo2 + bar);
})();
alert(foo2 + bar);




// @ RESULT:
/*

*/

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 9.): What is the value of `foo.length`?
//* --------------------------------⇓(Code)⇓--------------------------------\\

var foo3 = [];
foo3.push(1);
foo3.push(2);




// @ RESULT:
/*

*/

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 10.): What is the value of `foo.x`?
//* --------------------------------⇓(Code)⇓--------------------------------\\

var foo4 = {n: 1};
var bar = foo;
foo.x = foo4 = {n: 2};




// @ RESULT:
/*

*/

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 11.): What does the following code print?
//* --------------------------------⇓(Code)⇓--------------------------------\\

console.log('one');
setTimeout(function() {
  console.log('two');
}, 0);
Promise.resolve().then(function() {
  console.log('three');
})
console.log('four');




// @ RESULT:
/*

*/

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 12.): What is the difference between these four promises?
//* --------------------------------⇓(Code)⇓--------------------------------\\

doSomething().then(function () {
  return doSomethingElse();
});

doSomething().then(function () {
  doSomethingElse();
});

doSomething().then(doSomethingElse());

doSomething().then(doSomethingElse);




// @ RESULT:
/*

*/

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 13.): What will the code below output to the console and why?
//* --------------------------------⇓(Code)⇓--------------------------------\\

(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));




// @ RESULT:
/*

*/

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 14.): Consider the two functions below. Will they both return the same thing? Why or why not?
//* --------------------------------⇓(Code)⇓--------------------------------\\

function foo5()
{
  return {
      bar: "hello"
  };
}

function foo6()
{
  return
  {
      bar: "hello"
  };
}




// @ RESULT:
/*

*/

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 15.): How would you make this work?

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




add(2, 5); // 7
add(2)(5); // 7

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 16.): What value is returned from the following statement?

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




"i'm a lasagna hog".split("").reverse().join("");

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 17.): What is the value of `window.foo`?

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




( window.foo || ( window.foo = "bar" ) );

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 18.): What is the outcome of the two alerts below?

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




var foo7 = "Hello";
(function() {
  var bar = " World";
  alert(foo7 + bar);
})();
alert(foo7 + bar);

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 19.): What is the value of `foo.length`?

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




var foo8 = [];
foo8.push(1);
foo8.push(2);

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 20.): What is the value of `foo.x`?

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




var foo9 = {n: 1};
var bar = foo9;
foo.x = foo9 = {n: 2};

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 21.): What does the following code print?

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




console.log('one');
setTimeout(function() {
  console.log('two');
}, 0);
Promise.resolve().then(function() {
  console.log('three');
})
console.log('four');

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 22.): What is the difference between these four promises?

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




doSomething().then(function () {
  return doSomethingElse();
});

doSomething().then(function () {
  doSomethingElse();
});

doSomething().then(doSomethingElse());

doSomething().then(doSomethingElse);

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 23.): What will the code below output to the console and why?

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




//!Question # 24.): Consider the two functions below. Will they both return the same thing? Why or why not?

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\




function foo10()
{
  return {
      bar: "hello"
  };
}

function foo20()
{
  return
  {
      bar: "hello"
  };
}

//-===================END====================\\




//* --------------------------------⇓(Code)⇓--------------------------------\\



