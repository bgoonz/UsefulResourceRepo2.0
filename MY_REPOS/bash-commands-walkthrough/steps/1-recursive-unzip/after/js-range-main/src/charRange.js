const chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const forwardCharRange = (start, end, options) => {
    let { step, inc } = options;
    let res = [];
    let startIdx = chars.indexOf(start)
    let endIdx = chars.indexOf(end)

    if (inc) {
        for (let i = startIdx; i <= endIdx; i += step) {
            res.push(chars[i]);
        }
    } else {
        for (let i = startIdx; i < endIdx; i += step) {
            res.push(chars[i]);
        }
    }

    return res;
}

const reverseCharRange = (start, end, options) => {
    let { step, inc } = options;
    let res = [];
    let startIdx = chars.indexOf(start)
    let endIdx = chars.indexOf(end)

    if (inc) {
        for (let i = startIdx; i >= endIdx; i -= step) {
            res.push(chars[i]);
        }
    } else {
        for (let i = startIdx; i > endIdx; i -= step) {
            res.push(chars[i]);
        }
    }
    return res;
}

const charRange = (start, end, options) => {
    if (start < end) {
        return forwardCharRange(start, end, options)
    }
    return reverseCharRange(start, end, options)
}

module.exports = { charRange }
