define(["../random/randInt"], function (randInt) {
    /**
     * Shuffle array items.
     */
    function shuffle(arr) {
        let results = [],
            rnd;
        if (arr == null) {
            return results;
        }

        let i = -1,
            len = arr.length;
        while (++i < len) {
            if (!i) {
                results[0] = arr[0];
            } else {
                rnd = randInt(0, i);
                results[i] = results[rnd];
                results[rnd] = arr[i];
            }
        }

        return results;
    }

    return shuffle;
});
