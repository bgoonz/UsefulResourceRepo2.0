var obj = {
    fun: function (c, d) {
        console.log(`${this.a},${this.b},${c},${d}`)
    },
}
var thisobj = { a: "test", b: 23 }
obj.fun.call(thisobj, "aaa", "bbb");
obj.fun.apply(thisobj, ["ccc", "ddd"]);
obj.fun.bind(thisobj, "eee", "fff")();


