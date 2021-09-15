// 常用的原生函数(内建函数)有:
// • String()
// • Number()
// • Boolean()
// • Array()
// • Object()
// • Function()
// • RegExp()
// • Date()
// • Error()
// • Symbol() ——ES6 中新加入的！


// 它们为基本数据类型值提供了该子类型所特有的方法和属性（如： String#trim() 和
// Array#concat(..) ）。
// 对于简单标量基本类型值，比如 "abc" ，如果要访问它的 length 属性或 String.prototype
// 方法，JavaScript 引擎会自动对该值进行封装（即用相应类型的封装对象来包装它）来实
// 现对这些属性和方法的访问。