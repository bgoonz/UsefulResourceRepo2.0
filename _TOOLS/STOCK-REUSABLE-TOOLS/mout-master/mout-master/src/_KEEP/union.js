/*Concat multiple arrays and remove duplicates
 */
function union(arrs) {
    let results = [];
    let i = -1,
        len = arguments.length;
    while (++i < len) {
        append(results, arguments[i]);
    }

    return unique(results);
}

return union;
