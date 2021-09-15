//变量和函数声明从它们在代码中出现的位置被“移动”到了最上面。这个过程就叫作提升。
//只有声明本身会被提升，而赋值或其他运行逻辑会留在原地 。

console.log(a); //2
var a = 2;


/////////////////////////////////////////////////////////

{
    console.log(t); // ReferenceError!
    let t = 2;
}

/////////////////////////////////////////////////////////

function foo() {
    var a;
    console.log(a); // undefined
    a = 2;
}
foo();

/////////////////////////////////////////////////////////

foo(); // 1
var foo;
function foo() {
    console.log(1);
}
foo = function () {
    console.log(2);
};
