/**
 * @param {number} n
 * @return {boolean}
 */
const isHappy = n => {
    const squareSums = [n];
    while (n !== 1) {
        n = squareSum(n);
        // check this square sum num exists or not.
        const isSquareSumApeared = squareSums.includes(n);
        if (isSquareSumApeared) return false;
        squareSums.push(n);
    }
    return true;
};

var squareSum = n => {
    let sum = 0;
    while (n > 0) {
        const lastDigit = n % 10;
        sum += lastDigit * lastDigit;
        n = Math.floor(n / 10);
    }
    return sum;
}
