define(["./forOwn"], function (forOwn) {
    /**
     * Get object values
     */
    function values(obj) {
        let vals = [];
        forOwn(obj, function (val, key) {
            vals.push(val);
        });
        return vals;
    }

    return values;
});
