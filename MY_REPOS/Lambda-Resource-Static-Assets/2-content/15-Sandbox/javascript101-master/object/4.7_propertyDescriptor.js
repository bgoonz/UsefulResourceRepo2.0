
var myObject = {
    a: 2
};
//检测属性特性的方法 Object.getOwnPropertyDescriptor
var result = Object.getOwnPropertyDescriptor(myObject, "a");
console.log(result); //{ value: 2, writable: true, enumerable: true, configurable: true }
// writable （可写）、enumerable （可枚举）和 configurable （可配置）。

//////////////////////////////////////////////
//可写 writable
//可以使用 Object.defineProperty(..)来添加一个新属性或者修改一个已有属性（如果它是 configurable ）并对特性进行设置。
var myObject1 = {};
Object.defineProperty(myObject1, "a", {
    value: 2,
    writable: false, // 不可写！
    configurable: true,
    enumerable: true
});
myObject1.a = 3;
console.log(myObject1.a); // 2

//////////////////////////////////////////////
//严格模式下，这种方法会出错
"use strict";
var myObject2 = {};
Object.defineProperty(myObject2, "a", {
    value: 2,
    writable: false, // 不可写！
    configurable: true,
    enumerable: true
});
myObject2.a = 3; // TypeError

//////////////////////////////////////////////
//可配置 configurable
//把 configurable 修改成 false 是单向操作，无法撤销！
var myObject = {
    a: 2
};
myObject.a = 3;
myObject.a; // 3
Object.defineProperty(myObject, "a", {
    value: 4,
    writable: true,
    configurable: false, // 不可配置！
    enumerable: true
});
myObject.a; // 4
myObject.a = 5;
myObject.a; // 5
Object.defineProperty(myObject, "a", {
    value: 6,
    writable: true,
    configurable: true,
    enumerable: true
}); // TypeError

//即便属性是 configurable:false ， 我们还是可以把 writable 的状态由 true 改为 false ，但是无法由 false 改为 true 。

//////////////////////////////////////////////

//delete
var myObject = {
    a: 2
};
myObject.a; // 2
delete myObject.a;
myObject.a; // undefined
Object.defineProperty(myObject, "a", {
    value: 2,
    writable: true,
    configurable: false,
    enumerable: true
});
myObject.a; // 2
delete myObject.a;
myObject.a; // 2

//delete 只用来直接删除对象的（可删除）属性。如果对象的某个属性是某个
//对象 / 函数的最后一个引用者，对这个属性执行 delete 操作之后，这个未引用的对象 / 函
//数就可以被垃圾回收。但是，不要把 delete 看作一个释放内存的工具（就像 C/C++ 中那样），
//它就是一个删除对象属性的操作，仅此而已。

//////////////////////////////////////////////

//可枚举 enumerable

