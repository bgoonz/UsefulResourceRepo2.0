package data.structures.java.dynamic;

import java.util.Arrays;

public class BuyStock
{
  //  Use DP to solve for this problem for two transactions:
  //  Note: can NOT buy twice in a row without selling,
  //  i.e.
  //    can't:    buy, buy, sell, sell
  //    must be:  buy, sell, buy, sell
  //  For two transactions we build left and right arrays.
  //  Consider input of prices:
  //  Prices: 1, 4, 5, 7, 6, 3, 2, 9
  //  Left array is a Max(prior, current - min)
  //  Left:   0, 3, 4, 6, 6, 6, 6, 8
  //  Right array is a Max(prior, max - current), Note: moving from right to left
  //  Right:  8, 7, 7, 7, 7, 7, 7, 0
  //  Value is computed by picking sum of max from left and right arrays
  private int[] prices;

  public BuyStock(int [] prices)
  {
    this.prices = prices;
  }

  public int oneTransaction()
  {
    if(prices == null || prices.length == 0)
    {
      return 0;
    }

    int min = prices[0];
    int max = 0;

    for(int i = 1; i < prices.length; ++i)
    {
      max = Math.max(max, prices[i] - min);
      min = Math.min(min, prices[i]);
    }

    return max;
  }

  public int manyTransactions()
  {
    if(prices == null || prices.length == 0)
    {
      return 0;
    }

    int profit = 0;

    for(int i = 1; i < prices.length; ++i)
    {
      int diff = prices[i] - prices[i - 1];
      if(diff > 0)
      {
        profit += diff;
      }
    }
    return profit;
  }

  public int twoTransactions()
  {
    if(prices == null || prices.length == 0)
    {
      return 0;
    }

    int[] left = new int[prices.length];
    int[] right = new int[prices.length];

    int min = prices[0];
    for(int i = 1; i < prices.length; ++i)
    {
      left[i] = Math.max(left[i - 1], prices[i] - min);
      min = Math.min(min, prices[i]);
    }

    int max = prices[prices.length - 1];
    for(int i = prices.length - 2; i >= 0; i--)
    {
      right[i] = Math.max(right[i + 1], max - prices[i]);
      max = Math.max(max, prices[i]);
    }

    int[] sumArray = new int[prices.length];
    Arrays.setAll(sumArray, i -> left[i] + right[i]);
    return Arrays.stream(sumArray).max().getAsInt();
  }
}
