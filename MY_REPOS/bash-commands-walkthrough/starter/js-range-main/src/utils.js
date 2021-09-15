const newRangeError = (...args) => {
    let [start, end, options] = args
    let { step, inc } = options;

    return new RangeError(`Invalid args for range(${start},${end}) with options:{step: ${step}, inc: ${inc}}`)
}

const throwInvalidRange = (...args) => {
    throw newRangeError(...args);
}

const checkValue = (value) => {
    const isNumber = typeof value === "number";
    const isValidString = typeof value === "string" && value !== " " && value.length === 1;
    return isNumber || isValidString;
};

const checkAllValues = (start, end, options) => {

    if (!checkValue(start) || !checkValue(end)) return true;

    if (typeof start !== typeof end) return true;

    if (!Number.isInteger(options.step)) return true;

    if (options.step === 0) return true;

    if (options.step < 0) return true;

    return false;
}

module.exports = {
    throwInvalidRange,
    checkValue,
    checkAllValues
}
