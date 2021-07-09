/*Return a new Array with elements that aren't present in the other Arrays.
 */
function difference(arr) {
    let arrs = slice(arguments, 1),
        result = filter(unique(arr), function (needle) {
            return !some(arrs, function (haystack) {
                return contains(haystack, needle);
            });
        });
    return result;
}

return difference;
