function fn1() {
    console.log(a); // 2
}
function fn2() {
    var a = 3;
    fn1();
}
var a = 2;
fn2();