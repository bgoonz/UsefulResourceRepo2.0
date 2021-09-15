const forwardNumRange = (start, end, options) => {
    let { step, inc } = options
    let res = [];

    if (inc) {
        for (let idx = start; idx <= end; idx += step) {
            res.push(idx);
        }
    } else {
        for (let idx = start; idx < end; idx += step) {
            res.push(idx);
        }
    }
    return res;
}

const reverseNumRange = (start, end, options) => {
    let { step, inc } = options
    let res = [];

    if (inc) {
        for (let idx = start; idx >= end; idx -= step) {
            res.push(idx);
        }
    } else {
        for (let idx = start; idx > end; idx -= step) {
            res.push(idx)
        }
    }
    return res
}

const numRange = (start, end, options) => {
    if (start < end) {
        return forwardNumRange(start, end, options)
    }
    return reverseNumRange(start, end, options)
}

module.exports = { numRange }
