let obj = {}; //let obj=new Object();
let arr = []; //let arr=new Array();
function fun() { }// let fun=new Function(); 

console.log(fun.__proto__);
console.log(Function.prototype);
console.log(fun.__proto__ === Function.prototype);

/////////////////////////////////////////////////////////

function fn(a, b) {
    this.a = a;
    this.b = b;
}
fn.prototype.hello = function () {
    console.log("prototype->hello", this.a);
}

let fn1 = new fn("abc", 2);
fn1.hello = function () {
    console.log("fn1->hello", this.a);
}

let fn2 = new fn("efg", 3);

fn1.hello();
fn2.hello();