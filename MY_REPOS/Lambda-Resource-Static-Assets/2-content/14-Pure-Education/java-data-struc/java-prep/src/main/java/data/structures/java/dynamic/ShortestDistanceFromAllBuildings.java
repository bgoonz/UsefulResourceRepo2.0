package data.structures.java.dynamic;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class ShortestDistanceFromAllBuildings
{
  /*
  Buildings are designated with 1, obstacles with 2, empty land with 0, for example:
  1 0 2 0 1
  0 0 0 0 0
  0 0 1 0 0
  Position [1, 2] would be an ideal place to build house.
  We update the DP array once for each building, setting the distance from the given building to each available position
  For example:
  First Iteration:
  0 1 0 5 0
  1 2 3 4 5
  2 3 0 5 6
  Second Iteration:
  0 6 0 6 0
  6 6 6 6 6
  8 8 0 8 8
  Third Iteration:
  0  9 0 9  0
  9  8 7 8  9
  10 9 0 9 10
  */
  private static int[] X_MOVES = {1, -1, 0,  0};
  private static int[] Y_MOVES = {0,  0, 1, -1};
  private int[][] grid;
  private int[][] dp;
  public ShortestDistanceFromAllBuildings(int[][] grid)
  {
    this.grid = grid;
    dp = new int[grid.length][grid[0].length];
  }


  private boolean isValid(int x, int y)
  {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] == 0;
  }

  public int computeDistances()
  {
    List<int[]> buildings = new ArrayList<>();

    for (int i = 0; i < grid.length; ++i)
    {
      for (int j = 0; j < grid[0].length; ++j)
      {
        if (grid[i][j] == 1) //  building at this position
        {
          buildings.add(new int[]{i, j});
        }
      }
    }


    for (int[] building : buildings)
    {
      boolean [][] visited = new boolean[grid.length][grid[0].length];
      Queue<DistancePoint> queue = new LinkedList<>();
      queue.add(new DistancePoint(building[0], building[1], 0));

      while(!queue.isEmpty())
      {
        DistancePoint distancePoint = queue.poll();
        for (int i = 0; i < 4; ++i)
        {
          int xMove = distancePoint.x + X_MOVES[i];
          int yMove = distancePoint.y + Y_MOVES[i];

          if (isValid(xMove, yMove) && !visited[xMove][yMove])
          {
            visited[xMove][yMove] = true;
            dp[xMove][yMove] += distancePoint.distance + 1;
            queue.add(new DistancePoint(xMove, yMove, distancePoint.distance + 1));
          }
        }
      }
    }

    int min = Integer.MAX_VALUE;
    for(int i = 0; i < grid.length; ++i)
    {
      for(int j = 0; j < grid[0].length; ++j)
      {
        if(grid[i][j] == 0)
        {
          min = Math.min(min, dp[i][j]);
        }
      }
    }

    return min == Integer.MAX_VALUE ? -1 : min;
  }

  static class DistancePoint
  {
    DistancePoint(int x, int y, int distance)
    {
      this.x = x;
      this.y = y;
      this.distance = distance;
    }

    int x, y;
    int distance;
  }
}
