//简单基本类型
//string
//number
//boolean
//null
//undefined
//object

//简单基本类型（ string 、 boolean 、 number 、 null 和 undefined ）本身并不是对象。
//null 有时会被当作一种对象类型，但是这其实只是语言本身的一个 bug，即对 null 执行
//typeof null 时会返回字符串 "object" 。 1 实际上， null 本身是基本类型.

//有一种常见的错误说法是“JavaScript 中万物皆是对象”，这显然是错误的。
//实际上，JavaScript 中有许多特殊的对象子类型，我们可以称之为复杂基本类型。
//函数就是对象的一个子类型（从技术角度来说就是“可调用的对象”）。JavaScript 中的函数是“一等公民”，
//因为它们本质上和普通的对象一样（只是可以调用），所以可以像操作其他对象一样操作函数（比如当作另一个函数的参数）。
//数组也是对象的一种类型，具备一些额外的行为。数组中内容的组织方式比一般的对象要稍微复杂一些。
//JavaScript 中还有一些对象子类型，通常被称为内置对象。有些内置对象的名字看起来和简单基础类型一样，不过实际上它们的关系更复杂。
//它们实际上只是一些内置函数。这些内置函数可以当作构造函数来使用，从而可以构造一个对应子类型的新对象。

//String
//Number 
//Boolean 
//Object 
//Function
//Array
//Date 
//RegExp 
//Error 


var strPrimitive = "I am a string";
console.log( strPrimitive.length ); // 13
console.log( strPrimitive.charAt( 3 ) ); // "m"


//可以直接在字符串字面量上访问属性或者方法，之所以可以这
//样做，是因为引擎自动把字面量转换成 String 对象，所以可以访问属性和方法。

var r = 42.359.toFixed(2);

//等价于

var r =new Number(42.359).toFixed(2);


//null 和 undefined 没有对应的构造形式，它们只有文字形式。相反， Date 只有构造，没有文字形式。

//对于 Object 、 Array 、 Function 和 RegExp （正则表达式）来说，无论使用文字形式还是构造形式，它们都是对象，不是字面量。

//Error 对象很少在代码中显式创建，一般是在抛出异常时被自动创建。也可以使用 new Error(..) 这种构造形式来创建，不过一般来说用不着。