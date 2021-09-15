package data.structures.java.recursion;

public class RodCutting
{
  /*
  Consider a rod which can be cut into multiple pieces and corresponding price for each piece. For example:
  Length: 1 2 3 4  5  6  7  8  9 10
  Price:  1 5 8 9 10 17 17 20 24 30

   Compute max amount that could be made from cutting/or  not curring this rod
   */
  public static int maxValue(int[] prices)
  {
    return maxValue(prices, prices.length);
  }

  private static int maxValue(int[] prices, int n)
  {
    if(n == 0)
    {
      return 0;
    }

    int max = Integer.MIN_VALUE;
    for(int i = 0; i < n; ++i)
    {
      max = Math.max(max, prices[i] + maxValue(prices, n - i - 1));
    }
    return max;
  }

  public static int maxValueDynamic(int[] prices)
  {
    return data.structures.java.dynamic.RodCutting.maxValue(prices);
  }

}
