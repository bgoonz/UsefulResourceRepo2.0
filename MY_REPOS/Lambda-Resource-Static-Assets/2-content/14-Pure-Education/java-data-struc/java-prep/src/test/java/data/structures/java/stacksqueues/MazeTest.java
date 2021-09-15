package data.structures.java.stacksqueues;

import org.junit.Test;

import static org.junit.Assert.*;

public class MazeTest
{

  @Test
  public void solveBFS()
  {
    int[][] data = new int [][] {
        {1, 1, 0, 1},
        {0, 1, 1, 0},
        {0, 1, 1, 1},
        {0, 0, 1, 1},
        {0, 0, 1, 1}
    };
    Maze maze = new Maze(data);
    assertTrue(maze.solveBFS());
  }
}