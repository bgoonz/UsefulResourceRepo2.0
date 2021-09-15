package problems.java.fifo_lifo;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class KnightShortestWalk
{
    static class DistancePoint
    {
        int x, y, distance;
        DistancePoint(int x, int y, int distance)
        {
            this.x = x;
            this.y = y;
            this.distance = distance;
        }
        DistancePoint(int[] pt, int distance)
        {
            this(pt[0], pt[1], distance);
        }

        int[] getPoint()
        {
            return new int[] {x, y};
        }
    }

    private static int[] X_MOVES = {2, 1,  1,  2, -2, -1, -1, -2};
    private static int[] Y_MOVES = {1, 2, -2, -1,  1,  2, -2, -1};
    private static int SIZE = 8;

    private static boolean isValid(int x, int y)
    {
        return x >= 0 && x < SIZE && y >= 0 && y < SIZE;
    }

    static int shortestWalk(int[] start, int[] target)
    {
        Queue<DistancePoint> queue = new LinkedList<>();
        queue.offer(new DistancePoint(start, 0));
        while(!queue.isEmpty())
        {
            DistancePoint distancePoint = queue.poll();
            if(Arrays.equals(distancePoint.getPoint(), target))
            {
                return distancePoint.distance;
            }
            for(int i = 0; i < SIZE; ++i)
            {
                int nextX = distancePoint.x + X_MOVES[i];
                int nextY = distancePoint.y + Y_MOVES[i];
                if(isValid(nextX, nextY))
                {
                    queue.offer(new DistancePoint(nextX, nextY, distancePoint.distance + 1));
                }
            }
        }
        return -1;
    }


    static boolean testsPass()
    {
        boolean check = shortestWalk(new int[] {0, 0}, new int[] {4, 5}) == 3;
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
