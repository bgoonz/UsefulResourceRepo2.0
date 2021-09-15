//模块有两个主要特征： 
//（1）为创建内部作用域而调用了一个包装函数； 
//（2）包装函数的返回 值必须至少包括一个对内部函数的引用，这样就会创建涵盖整个包装函数内部作用域的闭包。

function Module1() {
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        console.log(something);
    }
    function doAnother() {
        console.log(another.join(" ! "));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}
var fn1 = Module1();
fn1.doSomething(); // cool
fn1.doAnother(); // 1 ! 2 ! 3


//模块模式需要具备两个必要条件
//1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。
//2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

//////////////////////////////////////////////////

//单例模式
var fn2 = (function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        console.log(something);
    }
    function doAnother() {
        console.log(another.join(" ! "));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
})();
fn2.doSomething(); // cool
fn2.doAnother(); // 1 ! 2 ! 3


/////////////////////////////////////////////////////

var fn3 = (function CoolModule(id) {
    function change() {
        publicAPI.identify = identify2;
    }
    function identify1() {
        console.log(id);
    }
    var publicAPI = {
        change: change,
        identify: identify1
    };
    return publicAPI;
})("foo module");
fn3.identify(); // foo module
fn3.change();
fn3.identify(); // FOO MODULE

////////////////////////////////////////////////////////////////

var MyModules = (function Manager() {
    var modules = {};
    function define(name, deps, impl) {
        for (var i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
    }
    function get(name) {
        return modules[name];
    }
    return {
        define: define,
        get: get
    };
})();

///////////////////////////////////////////////////

//define,   modules[name] = impl.apply(impl, deps)


var MyModules = (function Manager() {
    var modules = {};

    function define(name, deps, impl) {
        for (var i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
    }

    function get(name) { return modules[name]; }

    return { define: define, get: get };
})();



MyModules.define("bar", [], function () {
    function hello(who) {
        return "Let me introduce: " + who;
    }
    return {
        hello: hello
    };
});
MyModules.define("foo", ["bar"], function (bar) {
    var hungry = "hippo";
    function awesome() {
        console.log(bar.hello(hungry).toUpperCase());
    }
    return {
        awesome: awesome
    };
});
var bar = MyModules.get("bar");
var foo = MyModules.get("foo");
console.log(
    bar.hello("hippo")
); // Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO


//future...

//bar.js
// function hello(who) {
//     return "Let me introduce: " + who;
// } 
// export hello;
//foo.js
// 仅从 "bar" 模块导入 hello() import hello from "bar"; 

// var hungry = "hippo";

// function awesome() {
//     console.log(hello(hungry).toUpperCase());
// } 
// export awesome;
//baz.js
// 导入完整的 "foo" 和 "bar" 模块 
// module foo from "foo"; 
// module bar from "bar";

// console.log(bar.hello("rhino")); // Let me introduce: rhino 

// foo.awesome(); // LET ME INTRODUCE: HIPPO
