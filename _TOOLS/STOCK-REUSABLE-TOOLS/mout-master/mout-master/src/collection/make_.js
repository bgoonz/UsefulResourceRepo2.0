define(["../array/slice"], function (slice) {
    /**
     * internal method used to create other collection modules.
     */
    function makeCollectionMethod(arrMethod, objMethod, defaultReturn) {
        return function () {
            let args = slice(arguments);
            if (args[0] == null) {
                return defaultReturn;
            }
            // array-like is treated as array
            return typeof args[0].length === "number"
                ? arrMethod.apply(null, args)
                : objMethod.apply(null, args);
        };
    }

    return makeCollectionMethod;
});
