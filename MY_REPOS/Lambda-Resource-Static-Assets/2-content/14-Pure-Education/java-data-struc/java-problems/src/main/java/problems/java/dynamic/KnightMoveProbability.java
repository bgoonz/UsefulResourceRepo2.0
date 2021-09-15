package problems.java.dynamic;

import java.util.Arrays;

public class KnightMoveProbability
{
    private static int MOVE = 8;
    private static int[] X_MOVES = {1, 2, -1, -2,  1,  2, -1, -2};
    private static int[] Y_MOVES = {2, 1,  2,  1, -2, -1, -2, -1};


    static double computeProbability(int xStart, int yStart, int steps)
    {
        double[][][] dp = new double[MOVE][MOVE][steps + 1];

        Arrays.fill(dp[xStart][yStart], 1.0);
        //Arrays.stream(dp).forEach((double[][] a) -> Arrays.stream(a).forEach(b -> Arrays.fill(b, 1.0)));

        for(int step = 1; step <= steps; ++step)
        {
            for(int x = 0; x < MOVE; ++x)
            {
                for(int y = 0; y < MOVE; ++y)
                {
                    double probability = 0.0;
                    for(int i = 0; i < MOVE; ++i)
                    {
                        int nextX = x + X_MOVES[i];
                        int nextY = y + Y_MOVES[i];
                        if(isValid(nextX, nextY))
                        {
                            probability += dp[x][y][step - 1] / 8.0;
                        }
                    }
                    dp[x][y][step] = probability;
                }
            }
        }
        return dp[xStart][yStart][steps];
    }

    private static boolean isValid(int x, int y)
    {
        return x >= 0 && x < MOVE && y >= 0 && y < MOVE;
    }

    static boolean testsPass()
    {
        boolean check = computeProbability(0, 0, 1) == 0.25 &&
                computeProbability(0, 0, 2) == 0.0625 &&
                computeProbability(0, 0, 3) == 0.015625;
        if(!check)
        {
            return false;
        }

        check  = computeProbability(0, 2, 1) == 0.5;
        if(!check)
        {
            return false;
        }
        check  = computeProbability(3, 3, 1) == 1.0;
        if(!check)
        {
            return false;
        }

        double a = computeProbability(3, 3, 2);
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
