package data.structures.java.dynamic;

import java.util.Arrays;

public class ApplyDiscount
{
  /*
    Price of items is represented in an array, i.e.
    [2, 3, 1, 2, 4, 2]
    Each item is discounted by smallest value to its right.
    Thus, the discount array will contain:
    [1, 1, 0, 2, 2, 0]
    And actual price of items would be:
    [1, 2, 1, 0, 2, 2]
     */

  public static int totalAfterDiscounts(int[] prices)
  {
    int[] discount = new int[prices.length];
    int min = Integer.MAX_VALUE;
    for(int i = prices.length - 2; i >= 0; --i)
    {
      min = Math.min(min, prices[i + 1]);

      discount[i] = min > prices[i] ? 0 : min;
    }

    int result[] = new int[prices.length];
    Arrays.setAll(result, i -> prices[i] - discount[i]);
    return Arrays.stream(result).sum();
  }
}
