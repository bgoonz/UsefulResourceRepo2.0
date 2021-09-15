for (var i = 0; i < 10; i++) {
    console.log(i);
}
console.log(i);//10

//i 会被绑定在外部作用域（函数或全局）中

/////////////////////////////////////////////////////////

var a = true;
if (a) {
    var b = a * 2;
    console.log(b); //2
}
console.log(b); //2


//块作用域指的是变量和函数不仅可以属于所处的作用域，也可以属于某个代码块（通常指 { .. } 内部）。
(function abc() {
    {
        {
            var t = 22;
            console.log(t); //22
        }
        console.log(t); //22 
    }
    console.log(t); //22
})();
console.log(t); //t is not defined