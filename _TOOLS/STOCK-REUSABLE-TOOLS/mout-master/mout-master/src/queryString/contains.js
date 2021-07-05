define(["./getQuery"], function (getQuery) {
    /**
     * Checks if query string contains parameter.
     */
    function contains(url, paramName) {
        let regex = new RegExp("(\\?|&)" + paramName + "=", "g"); //matches `?param=` or `&param=`
        return regex.test(getQuery(url));
    }

    return contains;
});
