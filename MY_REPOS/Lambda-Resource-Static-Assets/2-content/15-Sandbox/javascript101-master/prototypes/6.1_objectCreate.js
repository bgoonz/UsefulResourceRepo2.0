var anotherObject = {
    a: 2
};
// 创建一个关联到 anotherObject 的对象
var myObject = Object.create(anotherObject);
myObject.a; // 2

for (var k in myObject) {
    console.log("found: " + k);
}
// found: a
console.log("a" in myObject); // true