// function* something() {
//     var nextVal;
//     while (true) {
//         if (nextVal === undefined) {
//             nextVal = 1;
//         }
//         else {
//             nextVal = (3 * nextVal) + 6;
//         }
//         yield nextVal;
//     }
// }

// for (var v of something()) {
//     console.log(v);
//     if (v > 500) {
//         break;
//     }
// }
// 1 9 33 105 321 969





function* something() {
    try {
        var nextVal;
        while (true) {
            if (nextVal === undefined) {
                nextVal = 1;
            }
            else {
                nextVal = (3 * nextVal) + 6;
            }
            yield nextVal;
        }
    }
    // 清理子句
    finally {
        console.log("cleaning up!");
    }
}


var it = something();
for (var v of it) {
    console.log(v);
    if (v > 500) {
        console.log(
            // 完成生成器的迭代器
            it.return("Hello World").value //调用 it.return(..) 之后，它会立即终止生成器
        );
        // 这里不需要break
    }
}
// 1 9 33 105 321 969
// 清理！
// Hello World