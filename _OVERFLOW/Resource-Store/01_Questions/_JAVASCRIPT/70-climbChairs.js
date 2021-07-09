/**
 * @param {number} n
 * @return {number}
 */
// interative
var climbStairs = n => {
    let result = 0;
    let stepOne = 1;
    let stepTwo = 2;
    if (n === 1) return stepOne;
    if (n === 2) return stepTwo;

    for (let i = 3; i <= n; i++) {
        result = stepOne + stepTwo;
        stepOne = stepTwo;
        stepTwo = result;
    }

    return result;
};

// 2nd try
var climbStairs = n => {
    if (n <= 2) return n;
    let stepOne = 1;
    let stepTwo = 2;
    let result;
    for (let i = 2; i < n; i++) {
        result = stepOne + stepTwo;
        stepOne = stepTwo;
        stepTwo = result;
    }

    return result;
};

// recursive, exponential complexity. Not accepted
var climbStairs = n => {
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (n > 2) return climbStairs(n-2) + climbStairs(n-1);
};

// not optimal
var climbStairs = n => {
    const f = [1, 2];
    for (let i = 2; i < n; i++) {
        f[i] = f[i-1] + f[i-2];
    }

    return f[n - 1];
};
