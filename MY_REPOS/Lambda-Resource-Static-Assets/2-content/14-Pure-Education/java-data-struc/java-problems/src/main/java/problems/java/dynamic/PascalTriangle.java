package problems.java.dynamic;

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

    static int[][] triangle;

    static void buildTriangle(int size)
    {
        triangle = new int[size][size];
        Arrays.stream(triangle).forEach(a -> Arrays.fill(a, 1));

        for(int row = 2; row < size; ++row)
        {
            for(int col = 1; col < row; ++col)
            {
                triangle[row][col] = triangle[row - 1][col - 1] + triangle[row - 1][col];
            }
        }
    }

    static int combinations(int setSize, int items)
    {
        if(setSize >= triangle.length || items >= triangle[0].length)
        {
            return -1;
        }

        return triangle[setSize][items];
    }

    static boolean testsPass()
    {
        buildTriangle(10);
        boolean check = combinations(3, 2) == 3;
        if(!check)
        {
            return false;
        }
        check = combinations(4, 2) == 6;
        if(!check)
        {
            return false;
        }
        check = combinations(5, 2) == 10 &&
                combinations(5, 2) == 10;
        if(!check)
        {
            return false;
        }
        return true;
    }

    public static void main(String... args)
    {
        if(testsPass())
        {
            System.out.println("Tests passed");
        }
        else
        {
            System.out.println("Tests failed");
        }
    }

}
