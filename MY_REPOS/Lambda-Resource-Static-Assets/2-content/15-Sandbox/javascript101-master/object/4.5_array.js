//数组也是对象，所以虽然每个下标都是整数，你仍然可以给数组添加属性：
var myArray = ["foo", 42, "bar"];
myArray.baz = "baz";
myArray.length; // 3
myArray.baz; // "baz"

/////////////////////////////////////
//如果你试图向数组添加一个属性，但是属性名“看起来”像一个数字，那它会变成
//一个数值下标（因此会修改数组的内容而不是添加一个属性）：
var myArray = [ "foo", 42, "bar" ];
myArray["3"] = "baz";
myArray.length; // 4
myArray[3]; // "baz"







//method

// concat()
// 连接两个或更多的数组，并返回结果。
// join()
// 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
// pop()
// 删除并返回数组的最后一个元素
// push()
// 向数组的末尾添加一个或更多元素，并返回新的长度。
// reverse()
// 颠倒数组中元素的顺序。
// shift()
// 删除并返回数组的第一个元素
// slice()
// 从某个已有的数组返回选定的元素
// sort()
// 对数组的元素进行排序
// splice()
// 删除元素，并向数组添加新元素。
// toSource()
// 返回该对象的源代码。
// toString()
// 把数组转换为字符串，并返回结果。
// toLocaleString()
// 把数组转换为本地数组，并返回结果。
// unshift()
// 向数组的开头添加一个或更多元素，并返回新的长度。
// valueOf()
// 返回数组对象的原始值




//遍历，返回一个最终结果值
var boolresult = names.every(function(item,index,array){   //对数组中元素每一项进行布尔运算，返回false和true。every函数，全部元素返回true时返回true。some函数某一元素返回true时返回true
    return (index>2);
});

//遍历，每一项返回一个对应值
var nameresult = names.map(function(item,index,array){   //返回数组，map函数获取每一项计算值的集合，不改变原数组，forEach函数等价于for语句，对每项处理
    return (item+1);
});

//过滤，挑选出满足条件的元素项
var nameresult = names.filter(function(item,index,array){   //返回数组，filter函数获取满足条件的项
    return (index>2);
});

//迭代，依次计算，返回一个最终值
nameresult = names.reduce(function(prev,cur,index,array){   //reduce从前向后迭代，reduceRight从后向前迭代。
    return prev+"+"+cur;                                    //迭代从第二项开始，prev初始值为第一项，cur初始值为第二项。计算值自动传给下一函数的prev，返回最后一次迭代产生的值
});


//some
//forEach
//..