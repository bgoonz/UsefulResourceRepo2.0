define(function () {
    /**
     * Split array into a fixed number of segments.
     */
    function split(array, segments) {
        segments = segments || 2;
        let results = [];
        if (array == null) {
            return results;
        }

        let minLength = Math.floor(array.length / segments),
            remainder = array.length % segments,
            i = 0,
            len = array.length,
            segmentIndex = 0,
            segmentLength;

        while (i < len) {
            segmentLength = minLength;
            if (segmentIndex < remainder) {
                segmentLength++;
            }

            results.push(array.slice(i, i + segmentLength));

            segmentIndex++;
            i += segmentLength;
        }

        return results;
    }
    return split;
});
