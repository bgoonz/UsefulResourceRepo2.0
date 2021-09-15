function Foo() {
    // ...
}
var a = new Foo();
Object.getPrototypeOf(a) === Foo.prototype; // true


function Foo() {
    // ...
}
Foo.prototype.constructor === Foo; // true
var a = new Foo();
a.constructor === Foo; // true
// .constructor 引用同样被委托给了 Foo.prototype ，而Foo.prototype.constructor 默认指向 Foo
//a1.constructor 是一个非常不可靠并且不安全的引用,尽量避免使用这些引用

function Foo(name) {
    this.name = name;
}
Foo.prototype.myName = function () {
    return this.name;
};
var a = new Foo("a");
var b = new Foo("b");
a.myName(); // "a"
b.myName(); // "b"