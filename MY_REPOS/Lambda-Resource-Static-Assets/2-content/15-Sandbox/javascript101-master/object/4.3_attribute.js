var myObject1 = {
    a: 2
};
console.log(myObject1.a); // 2  属性访问
console.log(myObject1["a"]); // 2   键访问



//属性名永远都是字符串,对象属性名中数字会被转换成字符串.
var myObject2 = {};
myObject2[true] = "foo";
myObject2[3] = "bar";
myObject2[myObject2] = "baz";
console.log(myObject2["true"]); // "foo"
console.log(myObject2["3"]); // "bar"
console.log(myObject2["[object Object]"]); // "baz"

//可计算属性名
var prefix = "foo";
var myObject = {
    [prefix + "bar"]: "hello",
    [prefix + "baz"]: "world"
};
myObject["foobar"]; // hello
myObject["foobaz"]; // world