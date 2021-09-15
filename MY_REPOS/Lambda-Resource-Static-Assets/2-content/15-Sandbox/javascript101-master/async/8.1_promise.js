
// Promise.resolve(..) 和 Promise.reject(..) 决议完成与拒绝
// then(..) 和 catch(..) 完成和拒绝处理函数


var p3 = new Promise(function (resolve, reject) {
    resolve("B");
});
var p1 = new Promise(function (resolve, reject) {
    resolve(p3);
});
p2 = new Promise(function (resolve, reject) {
    resolve("A");
});
p1.then(function (v) {
    console.log(v);
});

p2.then(function (v) {
    console.log(v);
});


var p = Promise.resolve(3);
p.then(function (v) {
    console.log(v); // 3
    return v * 2;
}).then(function (v) {
    console.log(v); // 6
});


var p = Promise.resolve(3);
p.then(function (v) {
    console.log(v); // 3
    return new Promise(function (resolve, reject) {
        // 异步代码
        resolve(v * 2);
    });
}).then(function (v) {
    console.log(v); // 6
});



function delay(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, time);
    });
}
delay(1000)
    .then(function STEP2() {
        console.log("step 2 (after 100ms)");
        return delay(2000);
    })
    .then(function STEP3() {
        console.log("step 3 (after another 200ms)");
    })
    .then(function STEP4() {
        console.log("step 4 (next Job)");
        return delay(5000);
    })
    .then(function STEP5() {
        console.log("step 5 (after another 50ms)");
    });


// Promise.all([ .. ])
//它们的完成顺序并不重要，但是必须都要完成，才能继续。完成值为所有传入 promise 的完成消息组成的数组
// Promise.race([ .. ])
//只有第一个到达终点的才算胜利，完成值是单个消息。
// one([ .. ])
// any([ .. ])
// first([ .. ])
// last([ .. ])
// forEach(..)
// map(..)