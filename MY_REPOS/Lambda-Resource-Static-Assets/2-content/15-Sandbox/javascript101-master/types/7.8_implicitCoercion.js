//隐式转换
var a = "42";
var b = "0";
var c = 42;
var d = 0;
a + b; // "420"
c + d; // 42

//数组
var a = [1, 2];
var b = [3, 4];
a + b; // "1,23,4"

//valueOf toString
var a = {
    valueOf: function () { return 42; },
    toString: function () { return 4; }
};
a + ""; // "42"
String(a); // "4"

//字符串强制类型转换为数字的情况
var a = "3.14";
var b = a - 0;
b; // 3.14


var a = [3];
var b = [1];
a - b; // 2



// && 和 ||
// && 和 || 运算符的返回值并不一定是布尔类型，而是两个操作数其中一个的值。
var a = 42;
var b = "abc";
var c = null;
a || b; // 42
a && b; // "abc"
c || b; // "abc"
c && b; // null


a || b;
// 大致相当于(roughly equivalent to):
a ? a : b;
a && b;
// 大致相当于(roughly equivalent to):
a ? b : a;

// == 和 ===
// == 和 === 都会检查操作数的类型。区别在于操作数类型不同时它们的处理方式不同。

var x="22";
var y=22;
console.log(x==y); //true
console.log(x===y); //false