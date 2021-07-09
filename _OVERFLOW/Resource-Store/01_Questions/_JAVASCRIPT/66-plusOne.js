/**
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = digits => {
    const length = digits.length;
    let index = length - 1;
    while (index >= 0) {
        if (++digits[index] < 10) break;
        digits[index] -= 10;
        if (index === 0) {
            digits.unshift(1);
            break;
        }
        index--;
    }

    return digits;

};
