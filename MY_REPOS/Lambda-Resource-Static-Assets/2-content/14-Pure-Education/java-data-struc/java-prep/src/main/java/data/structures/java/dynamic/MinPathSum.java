package data.structures.java.dynamic;

public class MinPathSum
{
/*
  Given Input:
    {1, 2, 0, 3},
    {0, 4, 3, 2},
    {0, 2, 1, 5},
    {3, 1, 0, 4}

  DP Array:
    {1, 3, 3, 6},
    {1, 5, 6, 8},
    {1, 3, 4, 9},
    {4, 4, 4, 8}

*/
  private int[][] grid;

  public MinPathSum(int[][] grid)
  {
    this.grid = grid;
  }

  public int minPathSum()
  {
    if(grid == null || grid.length == 0)
    {
      return 0;
    }

    int rows = grid.length;
    int cols = grid[0].length;

    int[][] dp = new int[rows][cols];
    dp[0][0] = grid[0][0];

    //  init first row
    for(int i = 1; i < cols; ++i)
    {
      dp[0][i] = dp[0][i - 1] + grid[0][i];
    }

    //  init left col
    for(int i = 1; i < rows; ++i)
    {
      dp[i][0] = dp[i - i][0] + grid[i][0];
    }

    for(int i = 1; i < rows; ++i)
    {
      for(int j = 1; j < cols; ++j)
      {
        int min = Math.min(dp[i - 1][j], dp[i][j - 1]);
        dp[i][j] = grid[i][j] + min;
      }
    }
    return dp[rows - 1][cols - 1];
  }
}
