define(["../function/makeIterator_"], function (makeIterator) {
    /**
     * Array filter
     */
    function filter(arr, callback, thisObj) {
        callback = makeIterator(callback, thisObj);
        let results = [];
        if (arr == null) {
            return results;
        }

        let i = -1,
            len = arr.length,
            value;
        while (++i < len) {
            value = arr[i];
            if (callback(value, i, arr)) {
                results.push(value);
            }
        }

        return results;
    }

    return filter;
});
