package data.structures.java.dynamic;

public class RodCutting
{
  public static int maxValue(int[] prices)
  {
    int [] dp = new int[prices.length + 1];

    for(int i = 1; i <= prices.length; ++i)
    {
      int max = Integer.MIN_VALUE;
      for(int j = 0; j < i; ++j)
      {
        max = Math.max(max, prices[j] + dp[i - j - 1]);
      }
      dp[i] = max;
    }

    return dp[dp.length - 1];
  }

  public static int maxValueRecursion(int[] prices)
  {
    return data.structures.java.recursion.RodCutting.maxValue(prices);
  }
}
