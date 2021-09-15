var myObject1 = {
    a: 2
};
myObject1.a; // 2
//在语言规范中， myObject1.a 在 myObject1 上实际上是实现了 [[Get]] 操作（有点像函数调
//用： [[Get]]() ）。对象默认的内置 [[Get]] 操作首先在对象中查找是否有名称相同的属性，
//如果找到就会返回这个属性的值。

var myObject2 = {
    a: 2
};
myObject2.b; // undefined

var myObject3 = {
    a: undefined
};
myObject3.a; // undefined
myObject3.b; // undefined