/*Array some
 */
function some(arr, callback, thisObj) {
    callback = makeIterator(callback, thisObj);
    let result = false;
    if (arr == null) {
        return result;
    }

    let i = -1,
        len = arr.length;
    while (++i < len) {
        // we iterate over sparse items since there is no way to make it
        // work properly on IE 7-8. see #64
        if (callback(arr[i], i, arr)) {
            result = true;
            break;
        }
    }

    return result;
}

return some;
