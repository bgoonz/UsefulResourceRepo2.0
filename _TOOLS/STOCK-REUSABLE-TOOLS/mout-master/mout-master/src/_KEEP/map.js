/*Array map
 */
function map(arr, callback, thisObj) {
    callback = makeIterator(callback, thisObj);
    let results = [];
    if (arr == null) {
        return results;
    }

    let i = -1,
        len = arr.length;
    while (++i < len) {
        results[i] = callback(arr[i], i, arr);
    }

    return results;
}

return map;
