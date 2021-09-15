
var a = 2;
(function IIFE() {  //立即执行函数表达式
    var a = 3;
    console.log(a);
})();
console.log(a);


/////////////////////////////////////////////////////////

var obj = {
    a: 100
};
(function IIFE(def) {  //立即执行函数表达式（带参数）
    def(obj);
})(function def(o) {
    var a = 3;
    console.log(a);
    console.log(o.a);
});
