package data.structures.java.dynamic;

import java.util.Arrays;

public class KnightMoveProbability
{
  private static int SIZE = 8;
  private static int[] X_MOVES = {2, 1, -1, -2, -2, -1,  1,  2};
  private static int[] Y_MOVES = {1, 2,  2,  1, -1, -2, -2, -1};


  private boolean isValid(int x, int y)
  {
    return x >= 0 && x < SIZE && y >= 0 && y < SIZE;
  }

  public double computeProbability(int xStart, int yStart, int steps)
  {
    double dp[][][] = new double[SIZE][SIZE][steps + 1];

    //  For 0 steps, each position has probability of 1
    Arrays.fill(dp[0][0], 1);

    //  for every step
    for(int step = 1; step <= steps; ++step)
    {
      for(int x = 0; x < SIZE; ++x)
      {
        for(int y = 0; y < SIZE; ++y)
        {
          double probability = 0.0;

          for(int i = 0; i < SIZE; ++i)
          {
            int nextX = x + X_MOVES[i];
            int nextY = y + Y_MOVES[i];
            if(isValid(nextX, nextY))
            {
              probability += dp[x][y][step - 1] / 8.0;
            }
          }

          dp[x][y][step] = probability;
        }
      }
    }

    return dp[xStart][yStart][steps];
  }
}
