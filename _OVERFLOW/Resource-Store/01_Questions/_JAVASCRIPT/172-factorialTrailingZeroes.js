/**
 * @param {number} n
 * @return {number}
 */
// the trick is to count 5s in prime factors
const trailingZeroes = n => {
    let nums = 0;
    let factor = 5;
    while (n >= factor) {
        nums += Math.floor(n / factor);
        factor *= 5;
    }

    return nums;
};
