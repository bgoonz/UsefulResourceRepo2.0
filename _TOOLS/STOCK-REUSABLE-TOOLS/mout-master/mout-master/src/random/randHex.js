define(["./choice"], function (choice) {
    let _chars = "0123456789abcdef".split("");

    /**
     * Returns a random hexadecimal string
     */
    function randHex(size) {
        size = size && size > 0 ? size : 6;
        let str = "";
        while (size--) {
            str += choice(_chars);
        }
        return str;
    }

    return randHex;
});
