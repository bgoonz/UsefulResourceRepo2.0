//属于这个函数的全部变量都可以在整个函数的范围内使用及复用。
function foo(a) {
    var b = 2;
    function bar() {
        console.log( a, b, c ); 
    }
    var c = 3;
}
bar(); // 失败
console.log( a, b, c ); // 三个全都失败

/////////////////////////////////////////////////////////

var a = 2;
function foo() {
    var a = 3;
    console.log(a); //3
}
foo();
console.log(a); //2

/////////////////////////////////////////////////////////

//规避冲突
function foo() {
    function bar(a) {
        i = 3;
        console.log(a + i);
    }
    for (var i = 0; i < 10; i++) {  //块作用域参考1.6 blockscope.js
        bar(i * 2);   //死循环
    }
}
foo();
