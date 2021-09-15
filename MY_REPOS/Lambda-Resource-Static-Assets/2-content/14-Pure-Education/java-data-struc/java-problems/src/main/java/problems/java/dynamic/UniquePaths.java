package problems.java.dynamic;

public class UniquePaths
{
     /*
Consider following maze:    First row and First column of dp    sum above and to the left if maze[i][j] == 1
    {1, 1, 0, 1},           {1, 1, 0, 1},                       {1, 1, 0, 1},
    {0, 1, 1, 0},           {0, 0, 0, 0},                       {0, 1, 1, 0},
    {0, 1, 1, 1},           {0, 0, 0, 0},                       {0, 1, 2, 2},
    {0, 0, 1, 1},           {0, 0, 0, 0},                       {0, 0, 2, 4},
    {0, 0, 1, 1}            {0, 0, 0, 0},                       {0, 0, 2, 6}
    */

    static int uniquePaths(int [][] maze)
    {
        if(maze == null || maze.length == 0)
        {
            return 0;
        }

        int rows = maze.length, cols = maze[0].length;

        int[][] dp = new int[rows][cols];
        for(int i = 0; i < cols; ++i)
        {
            dp[0][i] = maze[0][i];
        }
        for(int i = 0; i < rows; ++i)
        {
            dp[i][0] = maze[i][0];
        }
        for(int i = 1; i < rows; ++i)
        {
            for(int j = 1; j < cols; ++j)
            {
                if (maze[i][j] == 1)
                {
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
                }
            }
        }

        return dp[rows - 1][cols - 1];
    }

    static boolean testsPass()
    {
        int [][] maze = {
                {1, 1, 0, 1},
                {0, 1, 1, 0},
                {0, 1, 1, 1},
                {0, 0, 1, 1},
                {0, 0, 1, 1}
        };
        boolean check = uniquePaths(maze) == 6;
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
