define(["./isKind"], function (isKind) {
    /**
     */
    let isArray =
        Array.isArray ||
        function (val) {
            return isKind(val, "Array");
        };
    return isArray;
});
