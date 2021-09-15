// Symbol.iterator
var arr = [4, 5, 6, 7, 8, 9];
for (var v of arr) {
    console.log(v);
}
// 4 5 6 7 8 9
// 定义一个只在奇数索引值产生值的迭代器
arr[Symbol.iterator] = function* () {
    var idx = 1;
    do {
        yield this[idx];
    } while ((idx += 2) < this.length);
};
for (var v of arr) {
    console.log(v);
}
// 5 7 9



// Symbol.toStringTag 与 Symbol.hasInstance
function Foo() { }
var a = new Foo();
a.toString(); // [object Object]
a instanceof Foo; // true
// 在 ES6 中，可以控制这些操作的行为特性：
function Foo(greeting) {
    this.greeting = greeting;
}
Foo.prototype[Symbol.toStringTag] = "Foo";
Object.defineProperty(Foo, Symbol.hasInstance, {
    value: function (inst) {
        return inst.greeting == "hello";
    }
});
var a = new Foo("hello"),
    b = new Foo("world");
b[Symbol.toStringTag] = "cool";
a.toString(); // [object Foo]
String(b); // [object cool]
a instanceof Foo; // true
b instanceof Foo; // false



// Symbol.species
class Cool {
    // 把@@species推迟到子类
    static get [Symbol.species]() { return this; }
    again() {
        return new this.constructor[Symbol.species]();
    }
}
class Fun extends Cool { }
class Awesome extends Cool {
    // 强制指定@@species为父构造器
    static get [Symbol.species]() { return Cool; }
}
var a = new Fun(),
    b = new Awesome(),
    c = a.again(),
    d = b.again();
c instanceof Fun; // true
d instanceof Awesome; // false
d instanceof Cool; // true


// Symbol.toPrimitive
var arr = [1, 2, 3, 4, 5];
arr + 10; // 1,2,3,4,510
arr[Symbol.toPrimitive] = function (hint) {
    if (hint == "default" || hint == "number") {
        // 求所有数字之和
        return this.reduce(function (acc, curr) {
            return acc + curr;
        }, 0);
    }
};
arr + 10; // 25




// Symbol.isConcatSpreadable
var a = [1, 2, 3],
    b = [4, 5, 6];
b[Symbol.isConcatSpreadable] = false;
[].concat(a, b); // [1,2,3,[4,5,6]]




// Symbol.unscopables
var o = { a: 1, b: 2, c: 3 },
    a = 10, b = 20, c = 30;
o[Symbol.unscopables] = {
    a: false,
    b: true,
    c: false
};
with (o) {
    console.log(a, b, c); // 1 20 3
}