function fn1(num) {
    console.log("foo: " + num);
    this.count++;
}
fn1.count = 0;
var i;
for (i = 0; i < 10; i++) {
    if (i > 5) {
        fn1(i);
    }
}
console.log(fn1.count); // 0



////////////////////////////////////////////////

function fn2() {
    var a = 2;
    this.fn3();
}
function fn3() {
    console.log(this.a);
}
fn2(); // ReferenceError: a is not defined

//this 是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。