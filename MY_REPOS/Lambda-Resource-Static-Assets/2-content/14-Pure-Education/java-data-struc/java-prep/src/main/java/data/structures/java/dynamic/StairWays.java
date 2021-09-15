package data.structures.java.dynamic;

import data.structures.java.recursion.StairWalk;

public class StairWays
{
  public static int countWays(int n)
  {
    if(n < 0) return 0;
    if(n == 0) return 1;
    if(n < 3) return n;

    int a = 1, b = 1, c = 2, d;
    for(int i = 3; i <= n; ++i)
    {
      d = a + b + c;
      a = b;
      b = c;
      c = d;
    }
    return c;
  }

  public static int countWaysRecursive(int n)
  {
    return StairWalk.countWays1(n);
  }
}
