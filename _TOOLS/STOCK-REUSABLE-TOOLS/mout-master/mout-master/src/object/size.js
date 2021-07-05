define(["./forOwn"], function (forOwn) {
    /**
     * Get object size
     */
    function size(obj) {
        let count = 0;
        forOwn(obj, function () {
            count++;
        });
        return count;
    }

    return size;
});
