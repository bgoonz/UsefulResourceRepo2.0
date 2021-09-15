//Regex is a pattern matching machine
//Create pattern and test it against exampels to determine a match
//construct a regular expression in one of two ways:
//1.) Using a regular expression literal, which consists of a pattern enclosed between slashes, as follows:
let re = /ab+c/;
//2.) Or calling the constructor function of the RegExp object, as follows:
// let re = new RegExp("ab+c");
const str = 'table football';
const regex = RegExp( 'foo*' );
const regex1 = RegExp( 'foo*', 'g' ); //- '*' is Zero or more of what's right before it
console.log( regex.test( str ) );
// expected output: true
console.log( regex.test( str ) );
// expected output: true
console.log( regex1.lastIndex );
// expected output: 0
console.log( regex1.test( str ) );
// expected output: true
console.log( regex1.lastIndex );
// expected output: 9
console.log( regex1.test( str ) );
// expected output: false
/*
node regex-notes.js
true
true
0
true
9
false
\___________________________________________________
bryan_dir:my_exitstatus:0 ====>
*/
//Regex Methods:  exec() and test() methods of RegExp, and with the match(), matchAll(), replace(), replaceAll(), search(), and split() methods of String
//------------------------------Star Operator------------------------------\\
// The star operator '*' means zero or more of something 
// the pattern th*e represents:
//!  t, ... then ... zero or more h, then e
const regex3 = RegExp( "th*e" );
const regex4 = RegExp( "at*" );
//! a, ... then... zero or more t
const str2 = "what is the pattern?";
const str3 = "what is the matter?";
const str4 = "is your name Pat?";
console.log( "🚀 ~ file: regex-notes.js ~ line 64 ~ regex3.test(str2),regex3.test(str3),regex3.test(str4)",
  regex3.test( str2 ), regex3.test( str3 ), regex3.test( str4 ) )
//� ~ file: regex-notes.js ~ line 64 ~ regex3.test(str2),regex3.test(str3),regex3.test(str4)
//- true true false
console.log( "🚀 ~ file: regex-notes.js ~ line 70 ~  regex4.test(str2), regex4.test(str3), regex4.test(str4)",
  regex4.test( str2 ), regex4.test( str3 ), regex4.test( str4 ) )
//� ~ file: regex-notes.js ~ line 70 ~  regex4.test(str2), regex4.test(str3), regex4.test(str4)
//- true true true
//------------------------------Optional Operator ? ------------------------------\\
//! the optional operator means zero or one of whatever comes after it
const regex5 = RegExp( "at*?" );
//!||    a,   ||      zero or one t,     ||   must be followed by another t      ||
console.log( "🚀 ~ file: regex-notes.js ~ line 79 ~ regex5.test(str2), regex5.test(str3), regex5.test(str4)",
  regex5.test( str2 ), regex5.test( str3 ), regex5.test( str4 ) )
//� ~ file: regex-notes.js ~ line 79 ~ regex5.test(str2), regex5.test(str3), regex5.test(str4)
//- true true true
//----------------------> att?
//! a, t, 
