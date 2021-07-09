/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
const solution = isBadVersion => {
    /**
     * Key: binary search, be careful to set low and high correctly
     *
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return n => {
        let low = 1;
        let high = n;
        while (low < high) {
            // be careful in JavaScript, using Math.floor to get the integer part
            const mid = Math.floor(low + (high - low) / 2);
            if (!isBadVersion(mid)) low = mid + 1;
            // and not `mid - 1` to high
            else high = mid;
        }
        return low;
    };
};
