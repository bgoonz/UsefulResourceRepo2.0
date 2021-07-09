/**
 * key: just use two variables, 'minPrice' to track the loweset prices,
 * 'maxProfit' to track max profit, scan the array once.
 *
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = prices => {
    if (prices.length === 0) return 0;

    let minPrice = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        minPrice = Math.min(minPrice, prices[i]);
    }

    return maxProfit;
};
