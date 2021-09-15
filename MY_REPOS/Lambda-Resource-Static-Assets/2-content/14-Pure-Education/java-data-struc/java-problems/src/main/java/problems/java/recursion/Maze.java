package problems.java.recursion;

import java.util.Arrays;

public class Maze
{
    //  backtracking
    static int[][] solve(int[][] maze)
    {
        int[][] solution = new int[maze.length][maze[0].length];
        solve(0, 0, maze, solution);
        return solution;
    }

    private static boolean solve(int x, int y, int[][] maze, int[][] solution)
    {
        if(x == maze.length - 1 && y == maze[0].length - 1)
        {
            solution[x][y] = 1;
            return true;
        }

        if(isValid(maze, x, y))
        {
            solution[x][y] = 1;
            if(solve(x + 1, y, maze, solution))
            {
                return true;
            }
            if(solve(x, y + 1, maze, solution))
            {
                return true;
            }
            solution[x][y] = 0;
        }
        return false;
    }

    private static boolean isValid(int[][] maze, int x, int y)
    {
        return x >= 0 && x < maze.length && y >= 0 && y < maze[0].length && maze[x][y] == 1;
    }

    private static void printSolution(int[][] solution)
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
        int[][] data = new int [][] {
                {1, 1, 0, 1},
                {0, 1, 0, 0},
                {0, 1, 1, 0},
                {0, 0, 1, 1},
                {0, 0, 0, 1}
        };
        int[][] solution = solve(data);
        boolean check = solution[solution.length - 1][solution[0].length - 1] == 1;
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {1, 1, 0, 0}, solution[0]) &&
                Arrays.equals(new int[] {0, 1, 0, 0}, solution[1]) &&
                Arrays.equals(new int[] {0, 1, 1, 0}, solution[2]) &&
                Arrays.equals(new int[] {0, 0, 1, 1}, solution[3]) &&
                Arrays.equals(new int[] {0, 0, 0, 1}, solution[4]);
        if(!check)
        {
            return false;
        }
        printSolution(solution);
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
