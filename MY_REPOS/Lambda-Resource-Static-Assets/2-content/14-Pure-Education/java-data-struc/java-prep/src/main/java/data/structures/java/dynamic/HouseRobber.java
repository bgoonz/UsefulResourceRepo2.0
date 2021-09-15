package data.structures.java.dynamic;

public class HouseRobber
{
  public static int houseRobber(int[] n)
  {
    if(n == null || n.length == 0)
    {
      return 0;
    }

    int[] dp = new int[n.length];
    dp[0] = n[0];
    dp[1] = Math.max(n[0], n[1]);

    for(int i = 2; i < n.length; ++i)
    {
      dp[i] = Math.max(dp[i - 2] + n[i], dp[i - 1]);
    }

    return dp[dp.length - 1];
  }
}
