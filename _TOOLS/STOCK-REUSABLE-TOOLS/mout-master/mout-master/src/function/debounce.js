define(function () {
    /**
     * Debounce callback execution
     */
    function debounce(fn, threshold, isAsap) {
        let timeout, result;
        function debounced() {
            let args = arguments,
                context = this;
            function delayed() {
                if (!isAsap) {
                    result = fn.apply(context, args);
                }
                timeout = null;
            }
            if (timeout) {
                clearTimeout(timeout);
            } else if (isAsap) {
                result = fn.apply(context, args);
            }
            timeout = setTimeout(delayed, threshold);
            return result;
        }
        debounced.cancel = function () {
            clearTimeout(timeout);
        };
        return debounced;
    }

    return debounce;
});
