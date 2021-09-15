package data.structures.java.dynamic;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class PascalTriangleTest
{
  PascalTriangle pascalTriangle;

  @Before
  public void setUp() throws Exception
  {
    pascalTriangle = new PascalTriangle(6);
  }

  @Test
  public void getTriangle()
  {
    int[][] triangle = pascalTriangle.getTriangle();

    assertEquals(2, triangle[2][1]);
    assertEquals(3, triangle[3][1]);
    assertEquals(3, triangle[3][2]);
    assertEquals(4, triangle[4][1]);
    assertEquals(4, triangle[4][3]);
    assertEquals(6, triangle[4][2]);
    assertEquals(5, triangle[5][1]);
    assertEquals(10, triangle[5][2]);
    assertEquals(10, triangle[5][3]);
    assertEquals(5, triangle[5][4]);
  }

  @Test
  public void combinations()
  {
    assertEquals(2, pascalTriangle.combinations(2, 1));
    assertEquals(3, pascalTriangle.combinations(3, 1));
    assertEquals(3, pascalTriangle.combinations(3, 2));
    assertEquals(4, pascalTriangle.combinations(4, 1));
    assertEquals(6, pascalTriangle.combinations(4, 2));
    assertEquals(4, pascalTriangle.combinations(4, 3));
    assertEquals(1, pascalTriangle.combinations(4, 4));
    assertEquals(5, pascalTriangle.combinations(5, 1));
    assertEquals(10, pascalTriangle.combinations(5, 2));
    assertEquals(10, pascalTriangle.combinations(5, 3));
    assertEquals(5, pascalTriangle.combinations(5, 4));
    assertEquals(1, pascalTriangle.combinations(5, 5));
  }
}