package data.structures.java.recursion;

public class Fibonacci
{
  /*
  Notes:
    The second function uses memoization.
    Since fib[2] is the first value that needs to be computed as: fib[0] + fib{1]
    The fib array needs to be sized as fib[n + 1]
   */
  //  Using this function same computations are performed repeatedly
  //  i.e. both left and right branch of the tree compute F(4), F(2) etc.
  public static int fib1(int n)
  {
    if(n < 0)
    {
      return -1;
    }
    else if(n < 2)
    {
      return n;
    }
    else return fib1(n - 1) + fib1(n - 2);
  }

  public static int fib2(int n)
  {
    //  fib(2) requires 3 array elements, thus n + 1
    int[] dp = new int[n + 1];
    dp[0] = 0; dp[1] = 1;

    return fib2(n, dp);
  }

  private static int fib2(int n, int[] dp)
  {
    if(n < 0)
    {
      return -1;
    }
    else if(n < 2)
    {
      return n;
    }

    if(dp[n] == 0)
    {
      dp[n] = fib2(n - 1, dp) + fib2(n - 2, dp);
    }
    return dp[n];
  }

  public static int fib1Dynamic(int n)
  {
    return data.structures.java.dynamic.Fibonacci.fib1(n);
  }

  public static int fib2Dynamic(int n)
  {
    return data.structures.java.dynamic.Fibonacci.fib2(n);
  }

  public static int fib1Streams(int n)
  {
    return data.structures.java.functional.numbers.Fibonacci.fibonacci1(n);
  }

  public static int fib2Streams(int n)
  {
    return data.structures.java.functional.numbers.Fibonacci.fibonacci2(n);
  }

}
