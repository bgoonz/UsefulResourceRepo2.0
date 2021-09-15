//let 关键字可以将变量绑定到所在的任意作用域中（通常是 { .. } 内部）。换句话说， 
//let 为其声明的变量隐式地了所在的块作用域。

var a = true;

{
    var b = a * 2;
    console.log(b); //2
}

console.log(b); // 2

/////////////////////////////////////////////////////////

var c = true;

{
    let d = c * 2;
    console.log(d); //2
}

console.log(d); // ReferenceError
