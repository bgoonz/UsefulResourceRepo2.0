package problems.java.recursion;

import java.util.Arrays;

public class KnightTour
{
    //  Complexity: O(8^N^2) = 8^64
    //  backtracking
    private static int SIZE = 8;
    private static int[][] solution = new int[SIZE][SIZE];
    private static int[] X_MOVES = {2, 1, -1, -2, -2, -1,  1,  2};
    private static int[] Y_MOVES = {1, 2,  2,  1, -1, -2, -2, -1};
    static
    {
        Arrays.stream(solution).forEach(a -> Arrays.fill(a, - 1));
    }

    private static boolean isSafe(int x, int y)
    {
        return x >= 0 && x < SIZE && y >= 0 && y < SIZE && solution[x][y] == -1;
    }

    static boolean solve()
    {
        solution[7][7] = 0;
        return solve(7, 7, 1);
    }

    private static boolean solve(int x, int y, int move)
    {
        if(move == SIZE * SIZE)
        {
            return true;
        }

        for(int i = 0; i < SIZE; ++i)
        {
            int nextX = x + X_MOVES[i];
            int nextY = y + Y_MOVES[i];

            if(isSafe(nextX, nextY))
            {
                solution[nextX][nextY] = move;
                if(solve(nextX, nextY, move + 1))
                {
                    return true;
                }
                solution[nextX][nextY] = -1;
            }
        }
        return false;
    }

    private static void printSolution()
    {
        for(int x = 0; x < solution.length; ++x)
        {
            for(int y = 0; y < solution[0].length; ++y)
            {
                System.out.printf(" %2d ", solution[x][y]);
            }
            System.out.println("\n");
        }
    }

    static boolean testsPass()
    {
        boolean check = solve();
        if(!check)
        {
            return false;
        }
        else
        {
            printSolution();
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
