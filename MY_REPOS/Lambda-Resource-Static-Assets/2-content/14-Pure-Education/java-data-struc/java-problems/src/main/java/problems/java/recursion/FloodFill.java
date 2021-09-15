package problems.java.recursion;

import java.util.Arrays;

public class FloodFill
{
    /*
    Filling [3,3] with 2 will result in
    {0, 0, 0, 1, 0, 0, 0},          {0, 0, 0, 1, 2, 2, 2},
    {0, 0, 0, 1, 0, 0, 0},          {0, 0, 0, 1, 2, 2, 2},
    {0, 0, 1, 0, 0, 0, 0},          {0, 0, 1, 2, 2, 2, 2},
    {1, 1, 0, 0, 0, 1, 1},          {1, 1, 2, 2, 2, 1, 1},
    {0, 0, 0, 0, 1, 0, 0},          {2, 2, 2, 2, 1, 0, 0},
    {0, 0, 0, 1, 0, 0, 0},          {2, 2, 2, 1, 0, 0, 0},
    {0, 0, 0, 1, 0, 0, 0},          {2, 2, 2, 1, 0, 0, 0},
    */

    static void floodFill(int[][] grid, int[] pos, int toVal)
    {
        int row = pos[0], col = pos[1];
        int fromVal = grid[row][col];
        floodFill(grid, row, col, fromVal, toVal);
    }

    static private void floodFill(int[][] grid, int row, int col, int fromVal, int toVal)
    {
        if(row < 0 || row >= grid.length || col < 0 || col >= grid.length || grid[row][col] != fromVal)
        {
            return;
        }
        grid[row][col] = toVal;
        floodFill(grid, row + 1, col, fromVal, toVal);
        floodFill(grid, row - 1, col, fromVal, toVal);
        floodFill(grid, row, col + 1, fromVal, toVal);
        floodFill(grid, row, col - 1, fromVal, toVal);
    }

    static boolean testsPass()
    {
        int[][] data = {
                {0, 0, 0, 1, 0, 0, 0},
                {0, 0, 0, 1, 0, 0, 0},
                {0, 0, 1, 0, 0, 0, 0},
                {1, 1, 0, 0, 0, 1, 1},
                {0, 0, 0, 0, 1, 0, 0},
                {0, 0, 0, 1, 0, 0, 0},
                {0, 0, 0, 1, 0, 0, 0},
        };
        floodFill(data, new int[] {3, 3}, 2);
        int[][] expected = {
                {0, 0, 0, 1, 2, 2, 2},
                {0, 0, 0, 1, 2, 2, 2},
                {0, 0, 1, 2, 2, 2, 2},
                {1, 1, 2, 2, 2, 1, 1},
                {2, 2, 2, 2, 1, 0, 0},
                {2, 2, 2, 1, 0, 0, 0},
                {2, 2, 2, 1, 0, 0, 0},
        };


        for(int i = 0; i < expected.length; ++i)
        {
            int[] a1 = expected[i];
            int[] a2 = data[i];
            if(!Arrays.equals(a1, a2))
            {
                return false;
            }
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
