//迭代器[Symbol.iterator]
var something = (function () {
    var nextVal;
    return {
        [Symbol.iterator]: function () { return this; },
        // 标准迭代器接口方法
        next: function () {
            if (nextVal === undefined) {
                nextVal = 1;
            }
            else {
                nextVal = (3 * nextVal) + 6;
            }
            return { done: false, value: nextVal };//done 是一个 boolean 值，标识迭代器的完成状态； value 中放置迭代值。
        }
    };
})();
// console.log(something.next().value); // 1
// console.log(something.next().value); // 9
// console.log(something.next().value); // 33
// console.log(something.next().value); // 105
// console.log(something.next().value); // 321

for (var v of something) {  // for..of循环
    console.log(v);
    if (v > 1000) {
        break;
    }
}
// 1 9 33 105 321 969 2913


for (
    var ret;
    (ret = something.next()) && !ret.done;  //可以从next中传递值
) {
    console.log(ret.value);
    if (ret.value > 1000) {
        break;
    }
}
// 1 9 33 105 321 969 2913