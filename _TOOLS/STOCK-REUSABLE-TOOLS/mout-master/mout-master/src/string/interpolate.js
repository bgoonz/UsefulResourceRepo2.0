define(["../lang/toString", "../object/get"], function (toString, get) {
    let stache = /\{\{([^\}]+)\}\}/g; //mustache-like

    /**
     * String interpolation
     */
    function interpolate(template, replacements, syntax) {
        template = toString(template);
        let replaceFn = function (match, prop) {
            return toString(get(replacements, prop));
        };
        return template.replace(syntax || stache, replaceFn);
    }

    return interpolate;
});
