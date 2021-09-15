// 1. 如果在 [[Prototype]] 链上层存在名为 foo 的普通数据访问属性并且没
// 有被标记为只读（ writable:false ），那就会直接在 myObject 中添加一个名为 foo 的新
// 属性，它是屏蔽属性。
// 2. 如果在 [[Prototype]] 链上层存在 foo ，但是它被标记为只读（ writable:false ），那么
// 无法修改已有属性或者在 myObject 上创建屏蔽属性。如果运行在严格模式下，代码会
// 抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。
// 3. 如果在 [[Prototype]] 链上层存在 foo 并且它是一个 setter，那就一定会
// 调用这个 setter。 foo 不会被添加到（或者说屏蔽于） myObject ，也不会重新定义 foo 这
// 个 setter。

var anotherObject = {
    a: 2
};
var myObject = Object.create(anotherObject);
anotherObject.a; // 2
myObject.a; // 2
anotherObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("a"); // false
myObject.a++; // 隐式屏蔽！
anotherObject.a; // 2
myObject.a; // 3
myObject.hasOwnProperty("a"); // true

// 尽管 myObject.a++ 看起来应该（通过委托）查找并增加 anotherObject.a 属性，但是别忘
// 了 ++ 操作相当于 myObject.a = myObject.a + 1 。因此 ++ 操作首先会通过 [[Prototype]]
// 查找属性 a 并从 anotherObject.a 获取当前属性值 2，然后给这个值加 1，接着用 [[Put]]
// 将值 3 赋给 myObject 中新建的屏蔽属性 a