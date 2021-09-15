
// 二分查找是一种算法，其输入是一个有序的元素列表（必须有序）。
// 如果要 查找的元素包含在列表中，二分查找返回其位置；否则返回null
// 而使用二分查找时，最多需要检查log n个元素
// log指的都是log2，如果列表包含1024个元素，你最多需要检查10个元素.

function search(list, item) {
    var low = 0;
    var high = list.length - 1;

    while (low <= high) {
        var mid = parseInt((low + high) / 2);
        var guess = list[mid];
        if (item == guess) return mid;
        if (item < guess) high = mid - 1;
        else low = mid + 1;
    }
    return -1;
}


var lst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var result = search(lst, 3);
console.log(result);


// 如果列表包含100个元素，最多要猜7次；如果列表包含40亿个数字，最多 需猜32次