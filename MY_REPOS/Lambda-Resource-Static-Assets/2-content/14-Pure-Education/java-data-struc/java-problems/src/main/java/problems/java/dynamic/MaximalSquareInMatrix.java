package problems.java.dynamic;

import static problems.java.common.Common.min3;

public class MaximalSquareInMatrix
{
    /*
    https://leetcode.com/problems/maximal-square/solution/
    See also:
    https://www.geeksforgeeks.org/maximum-size-rectangle-binary-sub-matrix-1s/
    Given a 2D binary matrix filled with 0s and 1s,
    find the largest square containing only 1s and return its area.
    For example, given the following matrix:
        1 0 1 0 0
        1 0 1 1 1
        1 1 1 1 1
        1 0 0 1 0
    Return 4.
     */

    static int maximumSquare(int[][] data)
    {
        int rows = data.length, cols = data[0].length;

        int[][] dp = new int[rows + 1][cols + 1];

        int max = 0;
        for (int i = 1; i <= rows; i++)
        {
            for (int j = 1; j <= cols; j++)
            {
                if (data[i - 1][j - 1] == 1)
                {
                    dp[i][j] = 1 + min3(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
                    max = Math.max(max, dp[i][j]);
                }
            }
        }
        return max * max;
    }

    static boolean testsPass()
    {
        int[][] data1 = {
                {1, 0, 1, 0, 0},
                {1, 0, 1, 1, 1},
                {1, 1, 1, 1, 1},
                {1, 0, 0, 1, 0}
        };
        boolean check = maximumSquare(data1) == 4;
        if(!check)
        {
            return false;
        }

        int[][] data2 = {
                {0, 1, 1, 1, 0},
                {1, 1, 1, 1, 0},
                {0, 1, 1, 1, 1},
                {0, 1, 1, 1, 0},
                {0, 0, 1, 1, 1}
        };

        check = maximumSquare(data2) == 9;
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
