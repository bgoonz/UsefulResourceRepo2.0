define(["./forOwn"], function (forOwn) {
    /**
     * Get object keys
     */
    let keys =
        Object.keys ||
        function (obj) {
            let keys = [];
            forOwn(obj, function (val, key) {
                keys.push(key);
            });
            return keys;
        };

    return keys;
});
