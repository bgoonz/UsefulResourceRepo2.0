//不变性
//对象常量
//结合 writable:false 和 configurable:false 就可以创建一个真正的常量属性（不可修改、
//重定义或者删除）：
var myObject = {};
Object.defineProperty(myObject, "FAVORITE_NUMBER", {
    value: 42,
    writable: false,
    configurable: false
});


/////////////////////////////////////

//禁止扩展
//禁止一个对象添加新属性并且保留已有属性，可以使用 Object.preventExtensions(..) ：
var myObject = {
    a: 2
};
Object.preventExtensions(myObject);
myObject.b = 3;
myObject.b; // undefined
//在非严格模式下，创建属性 b 会静默失败。在严格模式下，将会抛出 TypeError 错误。

///////////////////////////////////////////////////////////////////
//密封

//Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用
//Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false 。
//所以，密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性（虽然可以修改属性的值）。

///////////////////////////////////////////////////////////////////
//冻结

//Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用
//Object.seal(..) 并把所有“数据访问”属性标记为 writable:false ，这样就无法修改它们的值。