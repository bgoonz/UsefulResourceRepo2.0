package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class IslandsTest
{

  @Test
  public void count()
  {
    int[][] data = new int[][]{
        {1, 1, 0, 1},
        {0, 1, 0, 0},
        {0, 1, 0, 0},
        {1, 0, 1, 1},
        {1, 0, 1, 0}
    };
    Islands islands = new Islands(data);
    assertEquals(4, islands.count());
  }

  @Test
  public void count1()
  {
    int[][] data = new int[][]{
        {0, 0, 0, 0, 0},
        {0, 0, 1, 0, 0},
        {0, 1, 1, 1, 0},
        {0, 0, 1, 0, 0},
        {0, 0, 0, 0, 0},
        {0, 0, 0, 0, 0},

    };
    Islands islands = new Islands(data);
    assertEquals(1, islands.count());
  }


  @Test
  public void floodFill()
  {
    int[][] data = new int[][]{
        {1, 1, 1, 1, 1, 1, 1, 1},
        {1, 1, 1, 1, 1, 1, 0, 0},
        {1, 0, 0, 1, 1, 0, 1, 1},
        {1, 2, 2, 2, 2, 0, 1, 0},
        {1, 1, 1, 2, 2, 0, 1, 0},
        {1, 1, 1, 2, 2, 2, 2, 0},
        {1, 1, 1, 1, 1, 2, 1, 1},
        {1, 1, 1, 1, 1, 2, 2, 1},
    };

    Islands islands = new Islands(data);
    islands.floodFill(2, 3);
    int[][] output = islands.getGrid();

    assertArrayEquals(new int[]{1, 1, 1, 1, 1, 1, 1, 1}, output[0]);
    assertArrayEquals(new int[]{1, 1, 1, 1, 1, 1, 0, 0}, output[1]);
    assertArrayEquals(new int[]{1, 0, 0, 1, 1, 0, 1, 1}, output[2]);
    assertArrayEquals(new int[]{1, 3, 3, 3, 3, 0, 1, 0}, output[3]);
    assertArrayEquals(new int[]{1, 1, 1, 3, 3, 0, 1, 0}, output[4]);
    assertArrayEquals(new int[]{1, 1, 1, 3, 3, 3, 3, 0}, output[5]);
    assertArrayEquals(new int[]{1, 1, 1, 1, 1, 3, 1, 1}, output[6]);
    assertArrayEquals(new int[]{1, 1, 1, 1, 1, 3, 3, 1}, output[7]);
  }
}