var a = [1, 2, 3];
a.toString(); // "1,2,3"


//Json  总是返回字符串
JSON.stringify(42); // "42"
JSON.stringify("42"); // ""42"" （含有双引号的字符串）
JSON.stringify(null); // "null"
JSON.stringify(true); // "true"


// JSON.stringify(..) 在对象中遇到 undefined 、 function 和 symbol 时会自动将其忽略，在
// 数组中则会返回 null （以保证单元位置不变）。

JSON.stringify(undefined); // undefined
JSON.stringify(function () { }); // undefined
JSON.stringify(
    [1, undefined, function () { }, 4]
); // "[1,null,null,4]"
JSON.stringify(
    { a: 2, b: function () { } }
); // "{"a":2}"


//自定义序列化
var a = {
    b: 42,
    c: o,
    d: function () { }
};

a.toJSON = function () {
    // 序列化仅包含b
    return { b: this.b };
};
JSON.stringify(a); // "{"b":42}"

// 如果传递给 JSON.stringify(..) 的对象中定义了 toJSON() 方法，那么该方法会在字符
// 串化前调用，以便将对象转换为安全的 JSON 值。