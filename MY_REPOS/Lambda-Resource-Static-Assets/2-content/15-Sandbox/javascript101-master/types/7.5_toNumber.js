//其中 true 转换为 1 ， false 转换为 0 。 undefined 转换为 NaN ， null 转换为 0 。
//处理失败时返回 NaN （处理数字常量失败时会产生语法错误）。
var a = {
    valueOf: function () {
        return "42";
    }
};
var b = {
    toString: function () {
        return "42";
    }
};
var c = [4, 2];
c.toString = function () {
    return this.join(""); // "42"
};
Number(a); // 42
Number(b); // 42
Number(c); // 42
Number(""); // 0
Number([]); // 0
Number(["abc"]); // NaN