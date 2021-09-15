var a = 42;
var b = String(a);
var c = "3.14";
var d = Number(c);
b; // "42"
d; // 3.14

//一元运算 + 被普遍认为是显式强制类型转换。
var a = 42;
var b = a.toString();
var c = "3.14";
var d = +c;
b; // "42"
d; // 3.14

1 + - + + + - + 1; // 2 (非常不好得写法)

// 日期显式转换为数字
var d = new Date("Mon, 18 Aug 2014 08:53:06 CDT");
+d; // 1408369986000

// | 运算符
0 | -0; // 0
0 | NaN; // 0
0 | Infinity; // 0
0 | -Infinity; // 0

//
// ~x 等同于 -(x+1) 。

// 在 -(x+1) 中唯一能够得到 0 （或者严格说是 -0 ）的 x 值是 -1 。也就是说如果 x 为 -1 时， ~
// 和一些数字值在一起会返回假值 0 ，其他情况则返回真值。

//举个例子
var a = "Hello World";
if (a.indexOf("lo") >= 0) { // true
    // 找到匹配！
}
if (a.indexOf("lo") != -1) { // true
    // 找到匹配！
}
if (a.indexOf("ol") < 0) { // true
    // 没有找到匹配！
}
if (a.indexOf("ol") == -1) { // true
    // 没有找到匹配！
}

// >= 0 和 == -1 这样的写法不是很好，称为“抽象渗漏”(在代码中暴露了底层的实现细节)，
// ~ 和 indexOf() 一起可以将结果强制类型转换（实际上仅仅是转换）为真 / 假值：
var a = "Hello World";
~a.indexOf("lo"); // -4 <-- 真值!
if (~a.indexOf("lo")) { // true
    // 找到匹配！
}
~a.indexOf("ol"); // 0 <-- 假值!
!~a.indexOf("ol"); // true
if (!~a.indexOf("ol")) { // true
    // 没有找到匹配！
}


// ~~x 能将值截除为一个 32 位整数， x | 0 也可以
console.log(~~55.5); //55


//显式解析数字字符串
var a = "42";
var b = "42px";

Number(a); // 42
parseInt(a); // 42
Number(b); // NaN
parseInt(b); // 42


