var myObject = {
    // 给 a 定义一个 getter
    get a() {
        return 2;
    }
};
Object.defineProperty(
    myObject, // 目标对象
    "b", // 属性名
    { // 描述符
        // 给 b 设置一个 getter
        get: function () { return this.a * 2 },
        // 确保 b 会出现在对象的属性列表中
        enumerable: true
    }
);
console.log(myObject.a);  // 2
console.log(myObject.b); // 4

/////////////////////////////////////

///由于我们只定义了 a 的 getter，所以对 a 的值进行设置时 set 操作会忽略赋值操作，不会抛
///出错误。而且即便有合法的 setter，由于我们自定义的 getter 只会返回 2，所以 set 操作是没有意义的。
myObject.a = 3;
myObject.a; // 2

/////////////////////////////////////


var myObject2 = {
    // 给 a 定义一个 getter
    get a() {
        return this._a_;
    },
    // 给 a 定义一个 setter
    set a(val) {
        this._a_ = val * 2;
    }
};
myObject2.a = 2;
console.log(myObject2.a); // 4