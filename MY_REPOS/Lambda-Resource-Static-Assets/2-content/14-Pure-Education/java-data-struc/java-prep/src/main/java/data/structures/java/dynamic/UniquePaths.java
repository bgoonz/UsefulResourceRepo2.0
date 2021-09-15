package data.structures.java.dynamic;

public class UniquePaths
{
  int[][] maze;

  public UniquePaths(int[][] maze)
  {
    this.maze = maze;
  }
  public int uniquePaths()
  {
 /*
    Consider following maze:
        {1, 1, 0, 1},
        {0, 1, 1, 0},
        {0, 1, 1, 1},
        {0, 0, 1, 1},
        {0, 0, 1, 1}
    Initialize first row and column of the DP array
        {1, 1, 0, 1},
        {0, 0, 0, 0},
        {0, 0, 0, 0},
        {0, 0, 0, 0},
        {0, 0, 0, 0}

    From coordinate (1,1) sum above and to the left
      {1, 1, 0, 1}
      {0, 1, 1, 0}
      {0, 1, 2, 2}
      {0, 0, 2, 4}
      {0, 0, 2, 6}
  */
    int rows = maze.length;
    int cols = maze[0].length;

    int [][] dp = new int[rows][cols];

    //  Init first row
    for(int i = 0; i < cols; ++i)
    {
      dp[0][i] = maze[0][i];
    }
    //  Init first col
    for(int i = 0; i < rows; ++i)
    {
      dp[i][0] = maze[i][0];
    }

    for(int i = 1; i < rows; ++i)
    {
      for(int j = 1; j < cols; ++j)
      {
        if(maze[i][j] != 0)
        {
          dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
      }
    }

    return dp[rows - 1][cols - 1];
  }
}
