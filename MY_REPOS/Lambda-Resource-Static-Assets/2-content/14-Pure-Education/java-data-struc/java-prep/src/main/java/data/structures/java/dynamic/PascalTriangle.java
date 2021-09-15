package data.structures.java.dynamic;


import java.util.Arrays;

public class PascalTriangle
{
  /*
  Used to compute number of ways to choose k items from a set of size n
  The formula is: n!/(n - k)!k!
  However, using factorials quickly exceeds capacity of an integer
  Pascal's Triangle looks like this:
                1
              1   1
            1   2   1
          1  3    3   1
        1  4   6    4   1
      1  5   10  10   5   1
   When saved to array:
   1  1  1  1  1  1
   1  1  1  1  1  1
   1  2  1  1  1  1
   1  3  3  1  1  1
   1  4  6  4  1  1
   1  5 10 10  5  1
   */

  private int n;
  int [][] triangle;
  public PascalTriangle(int size)
  {
    this.n = size;
    triangle = new int[n][n];
    buildTriangle();
  }

  private void buildTriangle()
  {
    for(int i = 0; i < n; ++i)
    {
      Arrays.fill(triangle[i], 1);
    }

    for(int i = 2; i < n; ++i)
    {
      for(int j = 1; j < i; ++j)
      {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
    }
  }

  protected int[][] getTriangle()
  {
    return triangle;
  }

  public int combinations(int n, int k)
  {
    if(k >= this.n || n >= this.n)
    {
      return -1;
    }

    return triangle[n][k];
  }
}
