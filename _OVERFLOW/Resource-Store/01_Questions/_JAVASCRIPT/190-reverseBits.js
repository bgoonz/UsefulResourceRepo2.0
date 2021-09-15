/**
 * the key is to use bit AND &, after AND 1, only the last bit is reseved.
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
const reverseBits = n => {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        const lastBit = n & 1;
        result += lastBit * 2 ** (31 - i);
        n >>= 1;
    }
    return result;
};
