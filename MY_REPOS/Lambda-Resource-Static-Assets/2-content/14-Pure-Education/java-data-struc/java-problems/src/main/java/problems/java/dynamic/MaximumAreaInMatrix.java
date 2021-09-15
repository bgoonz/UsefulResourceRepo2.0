package problems.java.dynamic;

import java.util.Arrays;

import static problems.java.fifo_lifo.AreaUnderHistogram.maxAreaUnderHistogram;

public class MaximumAreaInMatrix
{
    /*
    https://www.geeksforgeeks.org/maximum-size-rectangle-binary-sub-matrix-1s/
    Input :
        0 1 1 0
        1 1 1 1
        1 1 1 1
        1 1 0 0
    Consider each row as a area under histogram
    Row 0: 0 1 1 0 ->  Area = 2
    Row 1: 1 2 2 1 ->  Area = 4
    Row 2: 2 3 3 2 ->  Area = 8
    Row:3: 3 4 0 0 ->  Area = 6
    */

    static int maximumArea(int[][] data)
    {
        int[] dp = Arrays.copyOf(data[0], data.length);

        int max = maxAreaUnderHistogram(dp);

        for(int row = 1; row < data.length; ++row)
        {
            for(int col = 0; col < data[0].length; ++col)
            {
                if(data[row][col] == 1)
                {
                    dp[col] = ++dp[col];
                }
                else
                {
                    dp[col] = 0;
                }
            }

            max = Math.max(max, maxAreaUnderHistogram(dp));
        }
        return max;
    }

    static boolean testsPass()
    {
        int[][] data = {
                {0, 1, 1, 0},
                {1, 1, 1, 1},
                {1, 1, 1, 1},
                {1, 1, 0, 0}
        };
        boolean check = maximumArea(data) == 8;
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
