package data.structures.java.dynamic;


public class Knapsack
{
  //  See: https://brilliant.org/wiki/backpack-problem/?subtopic=algorithms&chapter=dynamic-programming
  //  See same problem in recursion package
  /*
  Consider following:
  Capacity C = 2
  Weights: W[] = {1, 1, 1}
  Values:  V[] = {10, 20, 30}

  DP Array
  Rows: n
  Cols: C
  ----------
  0   0   0
  0   10  10
  0   20  30
  0   30  50
  */
  public static int knapsack(int C, int[] W, int[] V)
  {
    return knapsack(C, W, V, V.length);
  }

  private static int knapsack(int C, int[] W, int[] V, int n)
  {
    int dp[][] = new int[n + 1][C + 1];

    for(int i = 1; i <= n; ++i)
    {
      for(int j = 1; j <= C; ++j)
      {
        if(W[i - 1] <= j)
        {
          dp[i][j] = Math.max(V[i - 1] + dp[i - 1][j - W[i - 1]], dp[i - 1][j]);
        }
        else
        {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
    return dp[n][C];
  }


  public static int knapsackRecursive(int C, int[] W, int[] V)
  {
    return data.structures.java.recursion.Knapsack.knapsack(C, W, V);
  }

  private static int elevator(int C, int[] W, int n)
  {
    int dp[][] = new int[n + 1][C + 1];

    for(int i = 1; i <= n; ++i)
    {
      for(int w = 1; w <= C; w++)
      {
        if(W[i - 1] < w)
        {
          dp[i][w] = Math.max(W[i - 1] + dp[i - 1][w - W[i - 1]], dp[i - 1][w]);
        }
        else
        {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }
    return dp[n][C];
  }

  public static int elevator(int C, int [] W)
  {
    return elevator(C, W, W.length);
  }

}
