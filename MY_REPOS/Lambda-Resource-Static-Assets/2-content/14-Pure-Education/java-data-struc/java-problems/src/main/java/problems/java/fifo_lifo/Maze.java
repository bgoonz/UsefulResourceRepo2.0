package problems.java.fifo_lifo;

import java.util.LinkedList;
import java.util.Queue;

public class Maze
{
    static private boolean isValid(int x, int y, int[][] maze)
    {
        return x >= 0 && x < maze.length && y >= 0 && y < maze[0].length && maze[x][y] == 1;
    }

    static private boolean isValid(int[] pt, int[][] maze)
    {
        return isValid(pt[0], pt[1], maze);
    }

    static boolean solve(int[][] maze)
    {
        if(maze[0][0] == 0)
        {
            return false;
        }

        Queue<int[]> queue = new LinkedList<>();
        queue.offer(maze[0]);
        while(!queue.isEmpty())
        {
            int[] pt = queue.poll();
            if(pt[0] == maze.length - 1 && pt[1] == maze[0].length - 1)
            {
                return true;
            }
            int[] p1 = new int[] {pt[0] + 1, pt[1]};
            int[] p2 = new int[] {pt[0], pt[1] + 1};
            if(isValid(p1, maze))
            {
                queue.offer(p1);
            }
            if(isValid(p2, maze))
            {
                queue.offer(p2);
            }
        }
        return false;
    }

    static boolean testsPass()
    {
        int[][] data1 = new int [][] {
                {1, 1, 0, 1},
                {0, 1, 0, 0},
                {0, 1, 1, 0},
                {0, 0, 1, 1},
                {0, 0, 0, 1}
        };
        boolean check = solve(data1);
        if(!check)
        {
            return false;
        }
        int[][] data2 = new int [][] {
                {1, 1, 0, 1},
                {0, 1, 0, 0},
                {0, 1, 0, 0},
                {0, 0, 1, 1},
                {0, 0, 0, 1}
        };
        check = !solve(data2);
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
