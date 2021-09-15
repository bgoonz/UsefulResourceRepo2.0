// Mock jQuery
(function () {
    var id = 0;
    var jQueryFactory = function () {
        var jQuery = function () {};
        jQuery.fn = {};
        jQuery.id = ++id;

        return jQuery;
    };

    window.$ = window.jQuery = jQueryFactory();

    window.$.noConflict = function () {
        return jQueryFactory();
    };
}());

