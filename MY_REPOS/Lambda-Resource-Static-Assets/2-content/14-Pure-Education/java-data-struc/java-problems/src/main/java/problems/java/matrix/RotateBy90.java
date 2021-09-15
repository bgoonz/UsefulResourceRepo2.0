package problems.java.matrix;

import java.util.Arrays;

public class RotateBy90
{
    static void rotate(int [][] matrix, boolean clockwise)
    {
        /*
        Clockwise               CounterClockwise
        1 2 3     7 4 1         1 2 3     3 6 9
        4 5 6  -> 8 5 2         4 5 6  -> 2 5 8
        7 8 9     9 6 3         7 8 9     1 4 7
        */
        int rows = matrix.length;

        if(clockwise)
        {
            for(int i = 0; i < rows / 2; ++i)
            {
                for(int j = 0; j < rows - i - 1; ++j)
                {
                    int temp = matrix[i][j];
                    matrix[i][j] = matrix[rows - j - 1][i];
                    matrix[rows - j - 1][i] = matrix[rows - i - 1][rows - j - 1];
                    matrix[rows - i - 1][rows - j - 1] = matrix[j][rows - i - 1];
                    matrix[j][rows - i - 1] = temp;
                }
            }
        }
        else
        {
            for(int i = 0; i < rows / 2; ++i)
            {
                for(int j = 0; j < rows - i - 1; ++j)
                {
                    int temp = matrix[i][j];
                    matrix[i][j] = matrix[j][rows - i - 1];
                    matrix[j][rows - i - 1] = matrix[rows - i - 1][rows - j - 1];
                    matrix[rows - i - 1][rows - j - 1] = matrix[rows - j - 1][i];
                    matrix[rows - j - 1][i] = temp;
                }
            }
        }
    }

    static boolean testsPass()
    {
        int[][] data = {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };
        rotate(data, true);
        int[] a = Arrays.stream(data).flatMapToInt(Arrays::stream).toArray();
        boolean check = Arrays.equals(new int[] {7, 4, 1, 8, 5, 2, 9, 6, 3}, a);
        if(!check)
        {
            return false;
        }
        data = new int[][] {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };
        rotate(data, false);
        a = Arrays.stream(data).flatMapToInt(Arrays::stream).toArray();
        check = Arrays.equals(new int[] {3, 6, 9, 2, 5, 8, 1, 4, 7}, a);
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
