var myArray = [1, 2, 3];
for (var v of myArray) {
    console.log(v);
}


var it = myArray[Symbol.iterator]();
console.log(it.next()); // { value:1, done:false }
console.log(it.next()); // { value:2, done:false }
console.log(it.next()); // { value:3, done:false }
console.log(it.next()); // { value: undefined, done:true }

////////////////////////////////////////////////

//可以给任何想遍历的对象定义 @@iterator
var myObject = {
    a: 2,
    b: 3
};
Object.defineProperty(myObject, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function () {
        var o = this;
        var idx = 0;
        var ks = Object.keys(o);
        return {
            next: function () {
                return {
                    value: o[ks[idx++]],
                    done: (idx > ks.length)
                };
            }
        };
    }
});
// 手动遍历 myObject
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }
// 用 for..of 遍历 myObject
for (var v of myObject) {
    console.log(v);
}
// 2
// 3

////////////////////////////////////////////////////
var randoms = {
    [Symbol.iterator]: function () {
        return {
            next: function () {
                return { value: Math.random() };
            }
        };
    }
};
var randoms_pool = [];
for (var n of randoms) {
    randoms_pool.push(n);
    // 防止无限运行！
    if (randoms_pool.length === 100) break;
}