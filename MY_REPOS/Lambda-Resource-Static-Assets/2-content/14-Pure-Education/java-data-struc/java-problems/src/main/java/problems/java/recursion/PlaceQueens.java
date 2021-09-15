package problems.java.recursion;

public class PlaceQueens
{
    //  backtracking
    private static int SIZE = 8;
    private static int[][] solution = new int[SIZE][SIZE];

    static boolean solve()
    {
        return solve(0);
    }

    static private boolean solve(int col)
    {
        if(col == SIZE)
        {
            return true;
        }
        for(int row = 0; row < SIZE; ++row)
        {
            if(isSafe(row, col))
            {
                solution[row][col] = 1;
                if(solve(col + 1))
                {
                    return true;
                }
                solution[row][col] = 0;
            }
        }
        return false;
    }

    private static boolean isSafe(int row, int col)
    {
        for(int i = 0; i < SIZE; ++i)
        {
            if (solution[row][i] == 1)
            {
                return false;
            }
            if (solution[i][col] == 1)
            {
                return false;
            }
            for (int j = 0; j <SIZE; ++j)
            {
                if (solution[i][j] == 1 && Math.abs(row - i) == Math.abs(col - j))
                {
                    return false;
                }
            }
        }
        return true;
    }

    private static void printSolution()
    {
        for(int x = 0; x < SIZE; ++x)
        {
            for(int y = 0; y < SIZE; ++y)
            {
                System.out.printf(" %2d ", solution[x][y]);
            }
            System.out.println("\n");
        }
    }

    public static void main(String[] args)
    {
        if(solve())
        {
            printSolution();
        }
        else
        {
            System.out.println("Solution does not exist");
        }
    }
}
