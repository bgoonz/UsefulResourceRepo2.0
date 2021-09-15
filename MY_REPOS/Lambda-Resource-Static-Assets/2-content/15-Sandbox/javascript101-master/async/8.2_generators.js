var x = 1;
function* foo() {
    x++;
    console.log(x);
    yield; // 暂停！
    console.log("x:", x);
}
function bar() {
    x++;
}

var it = foo();
it.next();
bar();
it.next();

/////////////////可以接受参数（即输入），也能够返回值（即输出）/////////////////////////
function* foo2(x, y) {
    return x * y;
}
var it = foo2(2, 3);
var res = it.next();
console.log(res.value);

/////////////////迭代消息传递  /////////////////////////
function* foo3(x) {
    var y = x * (yield);
    return y;
}
var it = foo3(2);
it.next();
var res = it.next(3);
console.log(res.value);

/////////////////建立的双向消息传递  /////////////////////////

function* foo4(x) {
    var y = x * (yield "Hello"); // <-- yield一个值！ yield 发出一个值 "Hello"
    return y;
}
var it = foo4(2);
var res = it.next(); // 第一个next()，并不传入任何东西
console.log(res.value); // "Hello"
res = it.next(3); // 向等待的yield传入3
console.log(res.value); // 6

///////////////// 多个迭代器 ///////////////////////////

function* foo() {
    var x = yield 2;  //value 2
    z++;
    var y = yield (x * z); //value x *  yield
    console.log(x, y, z);
}
var z = 1;
var it1 = foo();
var it2 = foo();

var val1 = it1.next().value; // 2 <-- yield 2
var val2 = it2.next().value; // 2 <-- yield 2


val1 = it1.next(val2 * 10).value; // 40 <-- x:20, z:2
val2 = it2.next(val1 * 5).value; // 600 <-- x:200, z:3
it1.next(val2 / 2); // y:300
// 20 300 3
it2.next(val1 / 4); // y:10
// 200 10 3