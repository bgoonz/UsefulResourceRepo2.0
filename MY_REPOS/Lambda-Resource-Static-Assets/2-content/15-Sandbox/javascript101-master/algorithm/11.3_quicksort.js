//实现快速排序时，请随机地选择用作基准值的元素,快速排序的平均运行时间为O(n log n)。

function quicksort(list) {
    if (list.length < 2) {
        return list;
    } else {
        var pivot = list[0];
        var less = [];
        var great = [];
        for (var i = 1; i < list.length; i++) {
            if (list[i] <= pivot) {
                less.push(list[i]);
            } else {
                great.push(list[i]);
            }
        }
        return quicksort(less).concat([pivot]).concat(quicksort(great));
    }
}

var lst1 = [1, 6, 6, 8, 9, 2, 3, 7, 0, 9, 3, 5];
console.log(quicksort(lst1));