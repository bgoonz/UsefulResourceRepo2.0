package problems.java.fifo_lifo;

import java.util.LinkedList;
import java.util.Queue;

public class MouseAndCheese
{
    //  1 denotes valid move, 0 denotes invalid move, 9 denotes cheese

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
    private static int[] X_MOVES = {-1, 0, 0,  1};
    private static int[] Y_MOVES = { 0, 1, -1, 0};
    private static int[][] maze;

    private static boolean isValid(int x, int y)
    {
        return x >= 0 && x < maze.length && y >= 0 && y < maze[0].length && maze[x][y] != 0;
    }

    private static boolean isValid(int[] pt)
    {
        return isValid(pt[0], pt[1]);
    }

    static int distance(int[][] maze, int[] start)
    {
        MouseAndCheese.maze = maze;

        if(!isValid(start))
        {
            return 0;
        }

        Queue<DistancePoint> queue = new LinkedList<>();
        queue.offer(new DistancePoint(start[0], start[1], 0));
        while(!queue.isEmpty())
        {
            DistancePoint distancePoint = queue.poll();
            if(maze[distancePoint.x][distancePoint.y] == 9)
            {
                return distancePoint.distance;
            }

            for(int i = 0; i < X_MOVES.length; ++i)
            {
                int x = distancePoint.x + X_MOVES[i];
                int y = distancePoint.y + Y_MOVES[i];
                if(isValid(x, y))
                {
                    DistancePoint nextPoint = new DistancePoint(x, y, 1 + distancePoint.distance);
                    queue.offer(nextPoint);
                }
            }
        }
        return -1;
    }

    static boolean testsPass()
    {
        int maze[][] = {
                {1, 0, 1, 1, 1, 1, 1, 1, 1, 1 },
                {1, 0, 1, 0, 1, 1, 1, 0, 1, 1 },
                {1, 1, 1, 0, 1, 1, 0, 1, 1, 1 },
                {0, 0, 0, 0, 9, 0, 0, 1, 0, 1 },
                {1, 1, 1, 0, 1, 1, 1, 1, 1, 0 },
                {1, 0, 1, 1, 1, 1, 0, 1, 0, 0 },
                {1, 0, 0, 0, 0, 0, 0, 0, 0, 1 },
                {1, 0, 1, 1, 1, 1, 0, 1, 1, 1 },
                {1, 1, 1, 0, 0, 1, 1, 1, 0, 1 }};
        boolean check = distance(maze, new int[] {0, 0}) == 11;
        if(!check)
        {
            return false;
        }

        check = distance(maze, new int[] {0, 9}) == 8;
        if(!check)
        {
            return false;
        }

        check = distance(maze, new int[] {4, 0}) == 7;
        if(!check)
        {
            return false;
        }

        check = distance(maze, new int[] {4, 5}) == 2;
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
