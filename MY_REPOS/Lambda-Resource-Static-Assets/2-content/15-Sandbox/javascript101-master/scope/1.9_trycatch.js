try {
    undefined();
} catch (err) {
    console.log(err);//undefined is not a function
}
console.log(err); // ReferenceError: err not found

//try / catch 的 catch 分句会创建一个块作用域，其中声明的变量仅在 catch 内部有效。
///////////////////////////////////////////////////

try { throw 2; } catch (a) {
    console.log(a); // 2
}
console.log(a); //a is not defined


///////////////////////////////////////////////////

{
    try {
        throw undefined;
    } catch (a) {
        a = 2;
        console.log(a); //2
    }
}
console.log(a);//a is not defined