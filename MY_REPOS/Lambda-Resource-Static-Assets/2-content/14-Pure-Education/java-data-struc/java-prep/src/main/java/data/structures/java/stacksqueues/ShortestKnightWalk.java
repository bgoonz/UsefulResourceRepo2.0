package data.structures.java.stacksqueues;

import java.util.LinkedList;
import java.util.Queue;

public class ShortestKnightWalk
{
  /*
  Given a square chessboard of N x N size,
  the position of Knight and position of a target is given.
  We need to find out minimum steps a Knight will take to reach the target position.
  Given: ( P = current position, T = Target, 1 = possible positions where knight can move )
    0 0 1 0 1 0 0 1
    0 1 0 0 0 1 1 0
    0 0 0 P 0 0 0 1
    0 1 0 0 0 1 1 0
    0 0 1 0 1 0 0 1
    0 0 1 0 0 1 1 0
    T 0 0 1 1 1 0 1

    Knight Pos: 4, 3
    Target Pos: 0, 0
    Moves:  (4, 3), (2, 4), (1, 2), (0, 0)

  Notes: make sure to use a Queue, not a Stack
  */
  private int[] position;
  private int[] target;

  private static int[] X_MOVES = {2, 1, -1, -2, -2, -1,  1,  2};
  private static int[] Y_MOVES = {1, 2,  2,  1, -1, -2, -2, -1};
  private static int SIZE = 8;

  public ShortestKnightWalk(int[] pos, int[] target)
  {
    this.position = pos;
    this.target = target;
  }

  private static boolean isValid(int x, int y)
  {
    return x >= 0 && x < SIZE && y >= 0 && y < SIZE;
  }

  public int walk()
  {
    boolean[][] visited = new boolean[SIZE][SIZE];
    visited[position[0]][position[1]] = true;

    Queue<DistancePoint> queue = new LinkedList<>();
    queue.offer(new DistancePoint(position[0], position[1], 0));
    while(!queue.isEmpty())
    {
      DistancePoint dp = queue.poll();

      //  Check for winner
      if(dp.x == target[0] && dp.y == target[1])
      {
        return dp.distance;
      }

      for(int i = 0; i < SIZE; ++i)
      {
        int nextX = dp.x + X_MOVES[i];
        int nextY = dp.y + Y_MOVES[i];

        if(isValid(nextX, nextY) && !visited[nextX][nextY])
        {
          visited[nextX][nextY] = true;
          queue.offer(new DistancePoint(nextX, nextY, dp.distance + 1));
        }
      }
    }
    return -1;
  }

  static class DistancePoint
  {
    int x, y, distance;
    DistancePoint(int x, int y, int distance)
    {
      this.x = x;
      this.y = y;
      this.distance = distance;
    }
  }
}
