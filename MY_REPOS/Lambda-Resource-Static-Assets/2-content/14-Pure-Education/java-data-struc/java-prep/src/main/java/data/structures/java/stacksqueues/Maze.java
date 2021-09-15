package data.structures.java.stacksqueues;

import java.util.LinkedList;
import java.util.Queue;

public class Maze
{
  /*
  pt values placed on the queue are the coordinates of the grid
   */
  protected int[][] maze;

  public Maze(int[][] maze)
  {
    this.maze = maze;
  }

  private boolean isValid(int x, int y)
  {
    return x >= 0 && x < maze.length && y >= 0 && y < maze[0].length && maze[x][y] == 1;
  }

  private boolean isValid(int[] pt)
  {
    int x = pt[0];
    int y = pt[1];
    return isValid(x, y);
  }

  public boolean solveBFS()
  {
    Queue<int[]> queue = new LinkedList<>();
    queue.add(new int[] {0, 0});
    while(!queue.isEmpty())
    {
      int[] pt = queue.poll();
      if(pt[0] == maze.length - 1 && pt[1] == maze[0].length - 1)
      {
        return true;
      }

      int[] newPt1 = new int[] {pt[0] + 1, pt[1]};
      int[] newPt2 = new int[] {pt[0], pt[1] + 1};
      if(isValid(newPt1))
      {
        queue.add(newPt1);
      }
      if(isValid(newPt2))
      {
        queue.add(newPt2);
      }
    }
    return false;
  }
}
