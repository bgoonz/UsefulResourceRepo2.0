// Reflect.getOwnPropertyDescriptor(..)
// Reflect.defineProperty(..)
// Reflect.getPrototypeOf(..)
// Reflect.setPrototypeOf(..)
// Reflect.preventExtensions(..)
// Reflect.isExtensible(..)

// Reflect.ownKeys(..)
// 返回所有“拥有”的（不是“继承”的）键的列表，就像 Object.getOwnPropertyNames
// (..) 和 Object.getOwnPropertySymbols(..) 返回的一样。关于键的顺序参见后面的“属
// 性排序”一节。
// Reflect.enumerate(..)
// 返回一个产生所有（拥有的和“继承的”）可枚举的（enumerable）非符号键集合的迭
// 代器（参见本系列《你不知道的 JavaScript（上卷）》第二部分）。本质上说，这个键的
// 集合和 foo..in 循环处理的那个键的集合是一样的。关于键的顺序参见后面的“属性排
// 序”一节。
// Reflect.has(..)
// 实质上和 in 运算符一样，用于检查某个属性是否在某个对象上或者在它的
// [[Prototype]] 链上。比如， Reflect.has(o, "foo") 实质上就是执行 "foo" in o 。
// 函数调用和构造器调用可以通过使用下面这些工具手动执行，与普通的语法（比如， (..)
// 和 new ）分开 :
// Reflect.apply(..)
// 举例来说， Reflect.apply(foo,thisObj,[42,"bar"])
// 以thisObj 作为 this 调用 foo(..)
// 函数，传入参数 42 和 "bar" 。
// Reflect.construct(..)
// 举例来说， Reflect.construct(foo,[42,"bar"]) 实质上就是调用 new foo(42,"bar") 。
// 可以使用下面这些工具来手动执行对象属性访问、设置和删除。
// Reflect.get(..)
// 举例来说， Reflect.get(o,"foo") 提取 o.foo 。
// Reflect.set(..)
// 举例来说， Reflect.set(o,"foo",42) 实质上就是执行 o.foo = 42 。
// Reflect.deleteProperty(..)
// 举例来说， Reflect.deleteProperty(o,"foo") 实质上就是执行 delete o.foo 。
// Reflect 的元编程能力提供了模拟各种语法特性的编程等价物，把之前隐藏的抽象操作暴
// 露出来。比如，你可以利用这些能力扩展功能和 API，以实现领域特定语言（DSL）