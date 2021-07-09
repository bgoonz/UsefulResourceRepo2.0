/*Array indicesOf
 */
function indicesOf(arr, item, fromIndex) {
    let results = [];
    if (arr == null) {
        return results;
    }

    fromIndex = typeof fromIndex === "number" ? fromIndex : 0;

    let length = arr.length;
    let cursor = fromIndex >= 0 ? fromIndex : length + fromIndex;

    while (cursor < length) {
        if (arr[cursor] === item) {
            results.push(cursor);
        }
        cursor++;
    }

    return results;
}

return indicesOf;
