function foo() {
    console.log("foo");
}
var someFoo = foo; // 对 foo 的变量引用
var myObject = {
    someFoo: foo
};
foo; // function foo(){..}
someFoo; // function foo(){..}
myObject.someFoo; // function foo(){..}



//////////////////////////////////


var myObject = {
    foo: function () {
        console.log("foo");
    }
};
var someFoo = myObject.foo;
someFoo; // function foo(){..}
myObject.foo; // function foo(){..}