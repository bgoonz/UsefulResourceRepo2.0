// 以下这些是假值：
// • undefined
// • null
// • false
// • +0 、 -0 和 NaN
// • ""

// 假值列表以外的都应该是真值（truthy）

var a = "false";
var b = "0";
var c = "''";
var d = Boolean(a && b && c);
d;//true

var a = []; // 空数组——是真值还是假值？
var b = {}; // 空对象——是真值还是假值？
var c = function () { }; // 空函数——是真值还是假值？
var d = Boolean(a && b && c);
d;//true