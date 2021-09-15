//Object.is(..)
// 静态函数 Object.is(..) 执行比 === 比较更严格的值比较。
var x = NaN, y = 0, z = -0;
x === x; // false
y === z; // true
Object.is(x, x); // true
Object.is(y, z); // false


// Object.setPrototypeOf(..)
var o1 = {
    foo() { console.log("foo"); }
};
var o2 = {
    // .. o2的定义 ..
};
Object.setPrototypeOf(o2, o1);
// 委托给o1.foo()
o2.foo(); 

