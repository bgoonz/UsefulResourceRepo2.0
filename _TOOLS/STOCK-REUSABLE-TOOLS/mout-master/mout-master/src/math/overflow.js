define(function () {
    /**
     * Wraps number within bounds both positive and negative
     */
    function overflow(number, min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }

        let difference = max - min;

        if (number < min) {
            number += difference * (~~((min - number) / difference) + 1);
        }

        return min + ((number - min) % difference);
    }

    return overflow;
});
