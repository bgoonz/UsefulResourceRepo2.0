package problems.java.recursion;

import java.util.Arrays;

public class Fibonacci
{
    static int fib(int n)
    {
        if(n < 0)
        {
            return 0;
        }
        if(n < 2)
        {
            return n;
        }

        return fib(n - 1) + fib(n - 2);

    }

    static int fibWithMemoization(int n)
    {
        if(n < 1)
        {
            return n;
        }

        int[] dp = new int[n + 1];
        Arrays.fill(dp, -1);
        dp[0] = 0;
        if(n > 0)
        {
            dp[1] = 1;
        }
        return fibWithMemoization(n, dp);
    }

    private static int fibWithMemoization(int n, int[] dp)
    {
        if(dp[n] == -1)
        {
            dp[n] = fibWithMemoization(n - 1, dp) +
                    fibWithMemoization(n - 2, dp);
        }
        return dp[n];
    }

    static boolean testsPass()
    {
        boolean check = fib(0) == 0;
        if(!check)
        {
            return false;
        }
        check = fib(1) == 1;
        if(!check)
        {
            return false;
        }
        check = fib(2) == 1;
        if(!check)
        {
            return false;
        }
        check = fib(14) == 377;
        if(!check)
        {
            return false;
        }

        check = fibWithMemoization(0) == 0;
        if(!check)
        {
            return false;
        }
        check = fibWithMemoization(1) == 1;
        if(!check)
        {
            return false;
        }
        check = fibWithMemoization(2) == 1;
        if(!check)
        {
            return false;
        }
        check = fibWithMemoization(14) == 377;
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
