package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class UniquePathsTest
{

  @Test
  public void uniquePaths()
  {
    int[][] data = new int [][] {
        {1, 1, 0, 1},
        {0, 1, 1, 0},
        {0, 1, 1, 1},
        {0, 0, 1, 1},
        {0, 0, 1, 1}
    };

    UniquePaths uniquePaths = new UniquePaths(data);
    assertEquals(6, uniquePaths.uniquePaths());
  }

}