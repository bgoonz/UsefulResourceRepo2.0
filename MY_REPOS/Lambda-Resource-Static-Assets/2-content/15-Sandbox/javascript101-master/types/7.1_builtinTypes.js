//JavaScript 有七种内置类型：
// • 空值（ null ）
// • 未定义（ undefined ）
// • 布尔值（ boolean ）
// • 数字（ number ）
// • 字符串（ string ）
// • 对象（ object ）
// • 符号（ symbol ，ES6 中新增）

//除对象之外，其他统称为“基本类型”。
typeof undefined === "undefined"; // true
typeof true === "boolean"; // true
typeof 56 === "number"; // true
typeof "abc" === "string"; // true
typeof { life: 11 } === "object"; // true
// ES6中新加入的类型
typeof Symbol() === "symbol"; // true

// null 比较特殊
typeof null === "object"; // true

// function （函数）也是 JavaScript 的一个内置类型。它实际上是 object 的一个“子类型”。
typeof function a() { /* .. */ } === "function"; // true

function a(b, c) {
    /* .. */
}
// 函数对象的 length 属性是其声明的参数的个数：
a.length; // 2

typeof [1, 2, 3] === "object"; // true
// 数组也是对象。它也是 object 的一个“子类型”。

/////////////////////////////////////////////////////////////////////////

// JavaScript 中的变量是没有类型的，只有值才有。变量可以随时持有任何类型的值。
var a = 42;
typeof a; // "number"
a = true;
typeof a; // "boolean"

/////////////////////////////////////////////////////////////////////////

// undefined 和 undeclared
// 已在作用域中声明但还没有赋值的变量，是 undefined 的。
// 相反，还没有在作用域中声明过的变量，是 undeclared 的。
// 变量在未持有值的时候为 undefined 。此时 typeof 返回 "undefined" 
var a;
typeof a; // "undefined"

var a;
a; // undefined     -->undefined
b; // ReferenceError: b is not defined   -->undeclared
// “undefined”和“is not defined” 是两回事


// typeof 特殊的安全防范机制（阻止报错）。
var a;
typeof a; // "undefined"
typeof b; // "undefined"
