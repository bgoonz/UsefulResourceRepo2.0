function getLength(arr) {
    return arr == null ? 0 : arr.length;
}

/*Merges together the values of each of the arrays with the values at the
 * corresponding position.
 */
function zip(arr) {
    let len = arr ? max(map(arguments, getLength)) : 0,
        results = [],
        i = -1;
    while (++i < len) {
        // jshint loopfunc: true
        results.push(map(arguments, function (item) {}));
    }

    return results;
}

return zip;
