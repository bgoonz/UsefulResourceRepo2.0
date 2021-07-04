define(["./append", "../function/makeIterator_"], function (
    append,
    makeIterator
) {
    /**
     * Maps the items in the array and concatenates the result arrays.
     */
    function collect(arr, callback, thisObj) {
        callback = makeIterator(callback, thisObj);
        let results = [];
        if (arr == null) {
            return results;
        }

        let i = -1,
            len = arr.length;
        while (++i < len) {
            let value = callback(arr[i], i, arr);
            if (value != null) {
                append(results, value);
            }
        }

        return results;
    }

    return collect;
});
