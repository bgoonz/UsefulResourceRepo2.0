package problems.java.recursion;

import java.util.Arrays;

public class StairWalk
{
    static int countWays(int stairs)
    {
        if(stairs < 0)
        {
            return 0;
        }
        if(stairs == 0)
        {
            return 1;
        }

        return countWays(stairs - 1) + countWays(stairs - 2) + countWays(stairs - 3);
    }

    static int countWaysWithMemoization(int stairs)
    {
        if(stairs < 0)
        {
            return 0;
        }
        if(stairs < 2)
        {
            return 1;
        }
        if(stairs == 2)
        {
            return 2;
        }

        int[] dp = new int[stairs + 1];
        dp[0] = 1;
        dp[1] = 1;
        dp[2] = 2;
        return countWaysWithMemoization(stairs, dp);
    }

    private static int countWaysWithMemoization(int n, int[] dp)
    {
        if(dp[n] == 0)
        {
            dp[n] = countWaysWithMemoization(n - 1, dp) +
                    countWaysWithMemoization(n - 2, dp) +
                    countWaysWithMemoization(n - 3, dp);
        }
        return dp[n];
    }

    static boolean testsPass()
    {
        boolean check = countWays(0) == 1;
        if(!check)
        {
            return false;
        }
        check = countWays(1) == 1;
        if(!check)
        {
            return false;
        }
        check = countWays(2) == 2;
        if(!check)
        {
            return false;
        }
        check = countWays(3) == 4;
        if(!check)
        {
            return false;
        }
        check = countWays(10) == 274;
        if(!check)
        {
            return false;
        }

        check = countWaysWithMemoization(0) == 1;
        if(!check)
        {
            return false;
        }
        check = countWaysWithMemoization(1) == 1;
        if(!check)
        {
            return false;
        }
        check = countWaysWithMemoization(2) == 2;
        if(!check)
        {
            return false;
        }
        check = countWaysWithMemoization(3) == 4;
        if(!check)
        {
            return false;
        }
        check = countWaysWithMemoization(10) == 274;
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
