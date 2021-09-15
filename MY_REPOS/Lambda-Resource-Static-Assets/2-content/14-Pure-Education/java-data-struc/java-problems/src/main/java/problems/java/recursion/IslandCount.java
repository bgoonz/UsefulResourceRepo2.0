package problems.java.recursion;

public class IslandCount
{
    static int countIslands(int[][] grid)
    {
        int count = 0;
        for(int i = 0; i < grid.length; ++i)
        {
            for(int j = 0; j < grid[0].length; ++j)
            {
                if(grid[i][j] == 1)
                {
                    count++;
                    merge(grid, i, j);
                }
            }
        }

        return count;
    }

    private static void merge(int[][] grid, int x, int y)
    {
        if(x < 0 || x >= grid.length || y < 0 || y >= grid[0].length  || grid[x][y] == 0)
        {
            return;
        }

        grid[x][y] = 0;

        merge(grid, x + 1, y);
        merge(grid, x, y + 1);
        merge(grid, x - 1, y);
        merge(grid, x, y - 1);
    }

    static boolean testsPass()
    {
        int[][] data = new int[][]{
                {1, 1, 0, 1},
                {0, 1, 0, 0},
                {0, 1, 0, 0},
                {1, 0, 1, 1},
                {1, 0, 1, 0}
        };
        boolean check = countIslands(data) == 4;
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
