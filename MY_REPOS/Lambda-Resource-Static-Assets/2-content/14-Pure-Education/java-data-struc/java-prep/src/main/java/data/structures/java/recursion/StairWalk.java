package data.structures.java.recursion;

public class StairWalk
{
  public static int countWays1(int n)
  {
    if(n < 0) return 0;
    if(n == 0) return 1;
    return countWays1(n - 1) + countWays1(n - 2) + countWays1(n - 3);
  }

  public static int countWays2(int n)
  {
    if(n < 0)
    {
      return 0;
    }
    if(n == 0)
    {
      return 1;
    }
    if(n < 3)
    {
      return n;
    }
    int[] dp = new int[n + 1];

    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 2;
    return countWays2(n, dp);
  }

  private static int countWays2(int n, int[] dp)
  {
    if(dp[n] == 0)
    {
      dp[n] = countWays2(n - 1, dp) + countWays2(n - 2, dp) + countWays2(n - 3, dp);
    }
    return dp[n];
  }


  public static int countWaysDynamic(int n)
  {
    return data.structures.java.dynamic.StairWays.countWays(n);
  }
}
