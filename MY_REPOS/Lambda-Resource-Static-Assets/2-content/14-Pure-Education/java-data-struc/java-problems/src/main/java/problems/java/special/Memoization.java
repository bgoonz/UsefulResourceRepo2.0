package problems.java.special;

public class Memoization
{
    static int fibWithMemoization(int n)
    {
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        return fibWithMemoization(n, dp);
    };

    private static int fibWithMemoization(int n, int[] dp)
    {
        if(n < 0)
        {
            return -1;
        }
        if(n < 2)
        {
            return n;
        }
        if(dp[n] == 0)
        {
            dp[n] = fibWithMemoization(n - 1, dp) + fibWithMemoization(n - 2, dp);
        }
        return dp[n];
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    static int countWaysWithMemoization(int stairs)
    {
        int[] dp = new int[stairs + 1];
        dp[0] = 1;
        dp[1] = 1;
        dp[2] = 2;
        return countWaysWithMemoization(stairs, dp);
    }


    private static int countWaysWithMemoization(int n, int[] dp)
    {
        if(n < 0)
        {
            return 0;
        }
        if(n == 0)
        {
            return 1;
        }
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
        boolean check = fibWithMemoization(14) == 377;
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
