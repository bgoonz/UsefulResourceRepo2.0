/**
 * @param {number} num
 * @return {boolean}
 */
const isPerfectSquare = num => {
    let lo = 1;
    let hi = num;
    let isPS = false;

    if (num === 1) {
        isPS = true;
    }

    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        const midSquare = mid * mid;
        if (midSquare === num) {
            isPS = true;
            break;
        } else if (midSquare > num) {
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }

    return isPS;
};
