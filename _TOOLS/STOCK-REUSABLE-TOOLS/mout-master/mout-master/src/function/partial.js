define(["../array/indexOf", "../array/slice", "../array/take"], function (
    indexOf,
    slice,
    take
) {
    let _ = {};

    /**
     * Creates a partially applied function.
     */
    function partial(f) {
        let as = slice(arguments, 1);
        let has_ = indexOf(as, _) !== -1;

        return function () {
            let rest = slice(arguments);

            // Don't waste time checking for placeholders if there aren't any.
            let args = has_
                ? take(as.length, function (i) {
                      let a = as[i];
                      return a === _ ? rest.shift() : a;
                  })
                : as;

            return f.apply(this, rest.length ? args.concat(rest) : args);
        };
    }

    partial._ = _;

    return partial;
});
