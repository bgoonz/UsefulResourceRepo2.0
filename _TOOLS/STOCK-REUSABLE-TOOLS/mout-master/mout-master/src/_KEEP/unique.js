/*@return {array} Array of unique items
 */
function unique(arr, compare) {
    compare = compare || isEqual;
    return filter(arr, function (item, i, arr) {
        let n = arr.length;
        while (++i < n) {
            if (compare(item, arr[i])) {
                return false;
            }
        }
        return true;
    });
}

function isEqual(a, b) {
    return a === b;
}

return unique;
