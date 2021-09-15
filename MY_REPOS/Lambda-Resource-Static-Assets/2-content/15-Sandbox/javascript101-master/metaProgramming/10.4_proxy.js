var obj = { a: 1 },
    handlers = {
        get(target, key, context) {
            // 注意：target === obj,
            // context === pobj
            console.log("accessing: ", key);
            return Reflect.get(
                target, key, context
            );
        }
    },
    pobj = new Proxy(obj, handlers);
obj.a;
// 1
pobj.a;
// accessing: a
// 1




// get(..)
// 通过 [[Get]] ，在代理上访问一个属性（ Reflect.get(..)
// 、
// . 属性运算符或 [ .. ] 属性
// 运算符）
// set(..)
// 通过 [[Set]] ， 在代理上设置一个属性值（ Reflect.set(..) 、赋值运算符 = 或目标为对
// 象属性的解构赋值）
// deleteProperty(..)
// 通 过 [[Delete]] ， 从 代 理 对 象 上 删 除 一 个 属 性（ Reflect.deleteProperty(..) 或
// delete ）
// apply(..) （如果目标为函数）
// 通 过 [[Call]] ， 将 代 理 作 为 普 通 函 数 / 方 法 调 用（ Reflect.apply(..)
// 、
// call(..)
// 、
// apply(..) 或 (..) 调用运算符）
// construct(..) （如果目标为构造函数）
// 通过 [[Construct]] ， 将代理作为构造函数调用（ Reflect.construct(..) 或 new ）
// getOwnPropertyDescriptor(..)
// 通过 [[GetOwnProperty]] ， 从代理中提取一个属性描述符（ Object.getOwnPropertyDescriptor(..)
// 或 Reflect.getOwnPropertyDescriptor(..) ）
// defineProperty(..)
// 通过 [[DefineOwnProperty]] ，在代理上设置一个属性描述符（ Object.defineProperty(..)
// 或 Reflect.defineProperty(..) ）
// getPrototypeOf(..)
// 通 过 [[GetPrototypeOf]] ， 得 到 代 理 的 [[Prototype]] （ Object.getPrototypeOf(..) 、
// Reflect.getPrototypeOf(..) 、 __proto__ 、 Object#isPrototypeOf(..) 或 instanceof ）
// setPrototypeOf(..)
// 通 过 [[SetPrototypeOf]] ， 设 置 代 理 的 [[Prototype]] （ Object.setPrototypeOf(..) 、
// Reflect.setPrototypeOf(..) 或 __proto__ ）
// preventExtensions(..)
// 通过 [[PreventExtensions]] ，使得代理变成不可扩展的（ Object.prevent Extensions(..)
// 或 Reflect.preventExtensions(..) ）
// isExtensible(..)
// 通过 [[IsExtensible]] ，检测代理是否可扩展（ Object.isExtensible(..) 或 Reflect.
// isExtensible(..) ）
// ownKeys(..)
// 通过 [[OwnPropertyKeys]] ，提取代理自己的属性和 / 或符号属性（ Object.keys(..) 、
// Object.getOwnPropertyNames(..) 、 Object.getOwnSymbolProperties(..) 、 Reflect.
// ownKeys(..) 或 JSON.stringify(..) ）
// enumerate(..)
// 通过 [[Enumerate]] ，取得代理拥有的和“继承来的”可枚举属性的迭代器（ Reflect.
// enumerate(..) 或 for..in ）
// has(..)
// 通过 [[HasProperty]] ，检查代理是否拥有或者“继承了”某个属性（ Reflect.has(..) 、
// Object#hasOwnProperty(..) 或 "prop" in obj )