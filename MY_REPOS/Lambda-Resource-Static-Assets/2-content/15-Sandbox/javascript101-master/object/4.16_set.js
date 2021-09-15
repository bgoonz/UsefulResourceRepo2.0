// Set 是成员值（任意类型）唯一的列表。
// WeakSet 也是 set，其中的值是弱持有的，也就是说如果其中的项目是对这个对象最后一个引用的时候，GC 可以移除它。

// set 是一个值的集合，其中的值唯一（重复会被忽略）。

var s = new Set();
var x = { id: 1 },
    y = { id: 2 };
s.add(x);
s.add(y);
s.add(x);
s.size; // 2
s.delete(y);
s.size; // 1
s.clear();
s.size;  //0
s.has(x); // false
s.has(y); // false


// iterable
var s = new Set();
var x = { id: 1 },
    y = { id: 2 };
s.add(x).add(y);
var keys = [...s.keys()],
    vals = [...s.values()],
    entries = [...s.entries()];
keys[0] === x;
keys[1] === y;
vals[0] === x;
vals[1] === y;
entries[0][0] === x;
entries[0][1] === x;
entries[1][0] === y;
entries[1][1] === y;


// set 固有的唯一性是它最有用的特性
var s = new Set([1, 2, 3, 4, "1", 2, 4, "5"]),
    uniques = [...s];
uniques; // [1,2,3,4,"1","5"]


// WeakSet
// WeakSet 的值必须是对象，而并不像 set 一样可以是原生类型值。
var s = new WeakSet();
var x = { id: 1 },
    y = { id: 2 };
s.add(x);
s.add(y);
x = null; // x可GC
y = null; // y可GC
