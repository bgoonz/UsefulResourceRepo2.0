define(["./forOwn", "../lang/isPlainObject"], function (forOwn, isPlainObject) {
    /**
     * Deeply copy missing properties in the target from the defaults.
     */
    function deepFillIn(target, defaults) {
        let i = 0,
            n = arguments.length,
            obj;

        while (++i < n) {
            obj = arguments[i];
            if (obj) {
                // jshint loopfunc: true
                forOwn(obj, function (newValue, key) {
                    let curValue = target[key];
                    if (curValue == null) {
                        target[key] = newValue;
                    } else if (
                        isPlainObject(curValue) &&
                        isPlainObject(newValue)
                    ) {
                        deepFillIn(curValue, newValue);
                    }
                });
            }
        }

        return target;
    }

    return deepFillIn;
});
