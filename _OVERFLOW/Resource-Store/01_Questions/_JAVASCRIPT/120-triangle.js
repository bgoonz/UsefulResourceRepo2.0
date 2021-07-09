/**
 * Dynamic programming
 *
 * @param {number[][]} triangle
 * @return {number}
 */
// straightforward, top-down, space O(N^2)
var minimumTotal = triangle => {
    const dp = [triangle[0]];
    for (let i = 1; i < triangle.length; i++) {
        // in JavaScript, remember to have a new array for each row.
        dp[i] = [];
        for (let j = 0; j < triangle[i].length; j++) {
            if (j === 0) dp[i][j] = dp[i - 1][j] + triangle[i][j];
            else if (j === triangle[i].length - 1) dp[i][j] = dp[i - 1][j - 1] + triangle[i][j];
            else dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
        }
    }
    return Math.min.apply(null, dp[triangle.length - 1]);
};

// bottom-up, space O(N)
var minimumTotal = triangle => {
    const length = triangle.length;
    const sum = triangle[length - 1];
    for (let i = length - 2; i >= 0; i--) {
        for (let j = 0; j < triangle[i].length; j++) {
            sum[j] = Math.min(sum[j], sum[j + 1]) + triangle[i][j];
        }
        console.log(sum);
    }
    return sum[0];
};
