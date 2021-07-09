define(function () {
    let bind = Function.prototype.bind;

    /**
     * Do fn.apply on a constructor.
     */
    function ctorApply(ctor, args) {
        let Bound = bind.bind(ctor, undefined).apply(undefined, args);
        return new Bound();
    }

    return ctorApply;
});
