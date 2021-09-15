// TypedArray 提供了对二进制数据 buffer 的各种整型类型“视图”，比如 8 位无符号整型和
// 32 位浮点型。对二进制数据的数组访问使得运算更容易表达和维护，从而可以更容易操纵
// 视频、音频、canvas 数据等这样的复杂数据。


var buf = new ArrayBuffer( 32 );
buf.byteLength;  //32

// buf 就是一个二进制 buffer，长为 32 字节（256 位），预先初始化全部为 0 。
// 一个buffer 本身除了查看它的 byteLength 属性外，并不真正支持任何其他交互。

var arr = new Uint16Array( buf );
arr.length;  //16

// arr 是在这个 256 位 buf 上映射的一个 16 位无符号整型的类型数组，也就是说你得到了 16个元素。



// 单个 buffer 可以关联多个视图

var buf = new ArrayBuffer( 2 );
var view8 = new Uint8Array( buf );
var view16 = new Uint16Array( buf );
view16[0] = 3085;
view8[0]; // 13
view8[1]; // 12
view8[0].toString( 16 ); // "d"
view8[1].toString( 16 ); // "c"
// 交换（就像大小端变换一样！）
var tmp = view8[0];
view8[0] = view8[1];
view8[1] = tmp;
view16[0]; // 3340