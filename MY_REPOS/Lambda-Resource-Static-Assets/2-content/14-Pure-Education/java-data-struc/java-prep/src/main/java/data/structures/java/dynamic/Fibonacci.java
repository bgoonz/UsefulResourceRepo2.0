package data.structures.java.dynamic;

public class Fibonacci
{
  public static int fib1(int n)
  {
    if(n < 2)
    {
      return n;
    }

    int a = 0, b = 1, c;
    for(int i = 2; i <= n; ++i)
    {
      c = a + b;
      a = b;
      b = c;
    }

    return b;
  }

  public static int fib2(int n)
  {
    if(n < 2)
    {
      return n;
    }
    int [] dp = new int[n + 1];
    dp[0] = 0; dp[1] = 1;
    for(int i = 2; i <= n; ++i)
    {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
  }

  public static int fibStreams1(int n)
  {
    return data.structures.java.functional.numbers.Fibonacci.fibonacci1(n);
  }

  public static int fibStreams2(int n)
  {
    return data.structures.java.functional.numbers.Fibonacci.fibonacci2(n);
  }

  public static int fibRecursive1(int n)
  {
    return data.structures.java.recursion.Fibonacci.fib1(n);
  }
  public static int fibRecursive2(int n)
  {
    return data.structures.java.recursion.Fibonacci.fib2(n);
  }

}
