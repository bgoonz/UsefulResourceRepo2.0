//字符串

var a = "foo";
var b = ["f", "o", "o"];
a.length; // 3
b.length; // 3

a
    // 将a的值转换为字符数组
    .split("")
    // 将数组中的字符进行倒转
    .reverse()
    // 将数组中的字符拼接回字符串
    .join("");

// number （数字）
// JavaScript 中的数字常量一般用十进制表示。例如：
var a = 42;
var b = 42.3;
// 数字前面的 0 可以省略：
var a = 0.42;
var b = .42;
// 小数点后小数部分最后面的 0 也可以省略：
var a = 42.0;
var b = 42.;

// tofixed(..) 方法可指定小数部分的显示位数
// 如果指定的小数部分的显示位数多于实际位数就用 0 补齐。
var a = 42.59;
a.toFixed(0); // "43"
a.toFixed(1); // "42.6"
a.toFixed(2); // "42.59"
a.toFixed(3); // "42.590"
a.toFixed(4); // "42.5900"

// toPrecision(..) 方法用来指定有效数位的显示位数：
// 无效语法：
// 42.toFixed( 3 ); // SyntaxError   因为 . 被视为常量 42. 的一部分
// 下面的语法都有效：
(42).toFixed(3); // "42.000"
0.42.toFixed(3); // "0.420"
42..toFixed(3); // "42.000"


// 二进制浮点数最大的问题（不仅 JavaScript，所有遵循 IEEE 754 规范的语言都是如此），是会出现如下情况：
0.1 + 0.2 === 0.3; // false
//二进制浮点数中的 0.1 和 0.2 并不是十分精确，它们相加的结果并非刚好等于0.3 ，而是一个比较接近的数字 0.30000000000000004 ，所以条件判断结果为 false 。

// 整数检测
Number.isInteger(42); // true
Number.isInteger(42.000); // true
Number.isInteger(42.3); // false

// undefined 类型只有一个值，即 undefined 。 null 类型也只有一个值，即 null 。它们的名称既是类型也是值

// • null 指空值（empty value）
// • undefined 指没有值（missing value）
// 或者：
// • undefined 指从未赋值
// • null 指曾赋过值，但是目前没有值

// void 运算符
var a = 42;
console.log(void a, a); // undefined 42

// 特殊的数字
// NaN 意指“不是一个数字”（not a number），
// NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。
var a = 2 / "foo";
var b = "foo";
a; // NaN
b; "foo"
window.isNaN(a); // true
window.isNaN(b); // true

//无穷数

var a = 1 / 0; // Infinity  Number.POSITIVE_INfiNITY
var b = -1 / 0; // -Infinity

var a = Number.MAX_VALUE; // 1.7976931348623157e+308
a + a; // Infinity
a + Math.pow(2, 970); // Infinity
a + Math.pow(2, 969); // 1.7976931348623157e+308

//零值
var a = 0 / -3; // -0
var b = 0 * -3; // -0
// 加法和减法运算不会得到负零（negative zero）。
var a = 0 / -3;
// 至少在某些浏览器的控制台中显示是正确的
a; // -0
// 但是规范定义的返回结果是这样！
a.toString(); // "0"
a + ""; // "0"
String(a); // "0"
// JSON也如此，很奇怪
JSON.stringify(a); // "0"

+"-0"; // -0
Number("-0"); // -0
JSON.parse("-0"); // -0
JSON.stringify(-0);//0


//值和引用

var a = 2;
var b = a; // b是a的值的一个副本
b++;
a; // 2
b; // 3
var c = [1, 2, 3];
var d = c; // d是[1,2,3]的一个引用
d.push(4);
c; // [1,2,3,4]
d; // [1,2,3,4]

// 简单值（即标量基本类型值，scalar primitive）总是通过值复制的方式来赋值 / 传递，包括
// null 、 undefined 、字符串、数字、布尔和 ES6 中的 symbol 。

// 复合值（compound value）——对象（包括数组和封装对象，参见第 3 章）和函数，则总
// 是通过引用复制的方式来赋值 / 传递。

// 由于引用指向的是值本身而非变量，所以一个引用无法更改另一个引用的指向。
var a = [1, 2, 3];
var b = a;
a; // [1,2,3]
b; // [1,2,3]
// 然后
b = [4, 5, 6];
a; // [1,2,3]
b; // [4,5,6]

function foo(x) {
    x.push(4);
    x; // [1,2,3,4]
    // 然后
    x = [4, 5, 6];
    x.push(7);
    x; // [4,5,6,7]
}
var a = [1, 2, 3];
foo(a);
a; // 是[1,2,3,4]，不是[4,5,6,7]


function foo(x) {
    x.push(4);
    x; // [1,2,3,4]
    // 然后
    x.length = 0; // 清空数组
    x.push(4, 5, 6, 7);
    x; // [4,5,6,7]
}
var a = [1, 2, 3];
foo(a);
a; // 是[4,5,6,7]，不是[1,2,3,4]

//虽然传递的是指向数字对象的引用复本，但我们并不能通过它来更改其中的基本类型值
function foo(x) {
    x = x + 1;
    x; // 3
}
var a = 2;
var b = new Number(a); // Object(a)也一样
foo(b);
console.log(b); // 是2，不是3