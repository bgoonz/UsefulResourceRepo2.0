package problems.java.dynamic;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class OptimalLocation
{
    /*
    Buildings are designated with 1, obstacles with 2, empty land with 0, for example:
    1 0 2 0 1
    0 0 0 0 0
    0 0 1 0 0
    Position [1, 2] would be an ideal place to build house.
    We update the DP array once for each building,
    setting the distance from the given building to each available position
    For example:
    First Iteration:    Second Iteration:   Third Iteration:
    0 1 0 5 0           0 6 0 6 0           0  9 0 9  0
    1 2 3 4 5           6 6 6 6 6           9  8 7 8  9
    2 3 0 5 6           8 8 0 8 8           10 9 0 9 10
    */

    static class DistancePoint
    {
        int x, y, distance;

        DistancePoint(int x, int y, int distance)
        {
            this.x = x;
            this.y = y;
            this.distance = distance;
        }
    }

    private static int[] X_MOVES = {1, -1, 0,  0};
    private static int[] Y_MOVES = {0,  0, 1, -1};
    private static int MOVES = 4;

    private static boolean isValid(int x, int y, int[][] grid)
    {
        return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] == 0;
    }

    static int computeOptimalDistance(int[][] grid)
    {
        int rows = grid.length, cols = grid[0].length;
        List<int[]> buildings = new ArrayList<>();

        for(int i = 0; i < rows; ++i)
        {
            for(int j = 0; j < cols; ++j)
            {
                if(grid[i][j] == 1)
                {
                    buildings.add(new int[] {i, j});
                }
            }
        }

        int[][] dp = new int[rows][cols];

        for(int[] building : buildings)
        {
            boolean[][] visited = new boolean[rows][cols];
            Queue<DistancePoint> queue = new LinkedList<>();
            queue.offer(new DistancePoint(building[0], building[1], 0));

            while(!queue.isEmpty())
            {
                DistancePoint distancePoint = queue.poll();
                for(int i = 0; i < MOVES; ++i)
                {
                    int xMove = distancePoint.x + X_MOVES[i];
                    int yMove = distancePoint.y + Y_MOVES[i];

                    if(isValid(xMove, yMove, grid) && !visited[xMove][yMove])
                    {
                        visited[xMove][yMove] = true;
                        dp[xMove][yMove] += distancePoint.distance + 1;
                        queue.offer(new DistancePoint(xMove, yMove, distancePoint.distance + 1));
                    }
                }
            }
        }

        int min = Integer.MAX_VALUE;
        for(int i = 0; i < rows; ++i)
        {
            for(int j = 0; j < cols; ++j)
            {
                if(grid[i][j] == 0)
                {
                    min = Math.min(min, dp[i][j]);
                }
            }
        }

        return min;
    }

    static boolean testsPass()
    {
        int[][] data = {
                {1, 0, 2, 0, 1},
                {0, 0, 0, 0, 0},
                {0, 0, 1, 0, 0}
        };
        boolean check = computeOptimalDistance(data) == 7;
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
