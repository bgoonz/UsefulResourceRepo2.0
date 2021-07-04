/*Array reduceRight
 */
function reduceRight(arr, fn, initVal) {
    let hasInit = arguments.length > 2;

    if (arr == null || !arr.length) {
        if (hasInit) {
            return initVal;
        } else {
            throw new Error("reduce of empty array with no initial value");
        }
    }

    let i = arr.length,
        result = initVal,
        value;
    while (--i >= 0) {
        // we iterate over sparse items since there is no way to make it
        // work properly on IE 7-8. see #64
        value = arr[i];
        if (!hasInit) {
            result = value;
            hasInit = true;
        } else {
            result = fn(result, value, i, arr);
        }
    }
    return result;
}

return reduceRight;
