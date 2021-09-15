package data.structures.java.stacksqueues;

import java.util.LinkedList;
import java.util.Queue;

public class MouseAndCheese
{
  //  1 denotes valid move, 0 denotes invalid move, 9 denotes cheese

  private int[][] maze;
  private int[] start;
  private static int[] X_MOVES = {-1, 0, 0, 1};
  private static int[] Y_MOVES = {0, -1, 1, 0};



  public MouseAndCheese(int[][] maze, int[] start)
  {
    this.start = start;
    this.maze = maze;
  }

  private boolean isValid(int x, int y)
  {
    return x >= 0 && x < maze.length && y >= 0 && y < maze[0].length && (maze[x][y] == 1 || maze[x][y] == 9);
  }

  public int distance()
  {
    boolean [][] visited = new boolean[maze.length][maze[0].length];

    Queue<DistancePoint> queue = new LinkedList<>();
    queue.offer(new DistancePoint(start[0], start[1], 0));
    while(!queue.isEmpty())
    {
      DistancePoint lastPoint = queue.poll();

      if(maze[lastPoint.x][lastPoint.y] == 9)
      {
        return lastPoint.distance;
      }

      for(int i = 0; i < 4; ++i)
      {
        int x = lastPoint.x + X_MOVES[i];
        int y = lastPoint.y + Y_MOVES[i];

        if(isValid(x, y) && !visited[x][y])
        {
          visited[x][y] = true;
          DistancePoint distancePoint = new DistancePoint(x, y, lastPoint.distance + 1);
          queue.offer(distancePoint);
        }
      }
    }
    return -1;
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
