function anotherFunction() { /*..*/ }
var anotherObject = {
    c: true
};
var anotherArray = [];
var myObject = {
    a: 2,
    b: anotherObject, // 引用，不是复本！
    c: anotherArray, // 另一个引用！
    d: anotherFunction
};

//对于 JSON 安全（也就是说可以被序列化为一个 JSON 字符串并且可以根据这个字符串解
//析出一个结构和值完全一样的对象）的对象来说，有一种巧妙的复制方法：

var newObj = JSON.parse(JSON.stringify(someObj));


//ES6 定义了 Object.assign(..) 方法来实现浅复制。 Object.assign(..) 方法的第一个参数是目标对象，之后还可以跟一个或多个源对象。

var newObj = Object.assign( {}, myObject );
newObj.a; // 2
newObj.b === anotherObject; // true
newObj.c === anotherArray; // true
newObj.d === anotherFunction; // true

