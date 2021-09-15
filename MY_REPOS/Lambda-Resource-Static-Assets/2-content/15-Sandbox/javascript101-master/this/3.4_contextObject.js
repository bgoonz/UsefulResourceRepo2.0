function fn1() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
obj.fn1(); // 2

////////////////////////////////////////////////

function fn2() {
    console.log(this.a);
}
var obj2 = {
    a: 42,
    foo: foo
};
var obj1 = {
    a: 2,
    obj2: obj2
};
obj1.obj2.fn2(); // 42
