// Map 是键 - 值对，其中的键不只是字符串 / 原生类型，也可以是对象。
// WeakMap 也是 map，其中的键（对象）是弱持有的，因此当它是对这个对象的最后一个引
// 用的时候，GC（垃圾回收）可以回收这个项目。

var m = new Map();
var x = { id: 1 },
    y = { id: 2 };
m.set(x, "foo");  //赋值
m.set(y, "bar");
m.get(x); // "foo"  //取值
m.get(y); // "bar"

m.delete(y); //删除元素

m.size;  //长度

//可以在 Map(..) 构造器中手动指定一个项目（entry）列表（键 / 值数组的数组）
var m = new Map([
    [x, "foo"],
    [y, "bar"]
]);
m.get(x); // "foo"
m.get(y); // "bar"


var vals = [...m.values()]; // map 中得到一列值，可以使用 values(..)
vals; // ["foo","bar"]
Array.from(m.values()); // ["foo","bar"]


//可以在一个 map 的项目上使用 entries() 迭代

var vals = [...m.entries()];
vals[0][0] === x; // true
vals[0][1]; // "foo"
vals[1][0] === y; // true
vals[1][1]; // "bar"

//要得到一列键，可以使用 keys()

var keys = [...m.keys()];
keys[0] === x; // true
keys[1] === y; // true

//确定一个 map 中是否有给定的键，可以使用 has(..) 方法
m.has(x); // true 
m.has(y); // false


// WeakMap

var m = new WeakMap();
var x = { id: 1 },
    y = { id: 2 },
    z = { id: 3 },
    w = { id: 4 };
m.set(x, y);
x = null; // { id: 1 } 可GC
y = null; // { id: 2 } 可GC
m.set(z, w);
w = null; // { id: 4 } 不可GC
