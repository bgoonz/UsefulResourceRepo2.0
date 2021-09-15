package data.structures.java.matrix;

import org.junit.Test;

import static org.junit.Assert.*;

public class RotateBy90Test
{
  @Test
  public void rotateClockwise()
  {
    int[][] data = {
        {1, 2},
        {3, 4}
    };
    RotateBy90.rotateClockwise(data);
    assertEquals(3, data[0][0]);
    assertEquals(1, data[0][1]);
    assertEquals(4, data[1][0]);
    assertEquals(2, data[1][1]);

    int[][] data1 = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    RotateBy90.rotateClockwise(data1);
    assertEquals(7, data1[0][0]);
    assertEquals(4, data1[0][1]);
    assertEquals(1, data1[0][2]);
    assertEquals(8, data1[1][0]);
    assertEquals(5, data1[1][1]);
    assertEquals(2, data1[1][2]);
    assertEquals(9, data1[2][0]);
    assertEquals(6, data1[2][1]);
    assertEquals(3, data1[2][2]);
  }

  @Test
  public void rotateCounterClockwise()
  {
//    int[][] data = {
//        {1, 2},
//        {3, 4}
//    };
//    RotateBy90.rotateCounterClockwise(data);
//    assertEquals(2, data[0][0]);
//    assertEquals(4, data[0][1]);
//    assertEquals(1, data[1][0]);
//    assertEquals(3, data[1][1]);
//
    int[][] data1 = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    RotateBy90.rotateCounterClockwise(data1);
    assertEquals(3, data1[0][0]);
    assertEquals(6, data1[0][1]);
    assertEquals(9, data1[0][2]);
    assertEquals(2, data1[1][0]);
    assertEquals(5, data1[1][1]);
    assertEquals(8, data1[1][2]);
    assertEquals(1, data1[2][0]);
    assertEquals(4, data1[2][1]);
    assertEquals(7, data1[2][2]);
  }
}