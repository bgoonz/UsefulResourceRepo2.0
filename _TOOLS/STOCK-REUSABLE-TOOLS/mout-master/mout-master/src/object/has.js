define(["./get"], function (get) {
    let UNDEF;

    /**
     * Check if object has nested property.
     */
    function has(obj, prop) {
        return get(obj, prop) !== UNDEF;
    }

    return has;
});
