package data.structures.java.numbers;

public class GCDForManyNumbers
{
  public static int gcd(int a, int b)
  {
    if(b == 0)
    {
      return a;
    }

    return gcd( b, a % b);
  }

  public static int gcd(int[] a)
  {
    int minGCD = Integer.MAX_VALUE;

    for(int i = 0; i < a.length - 1; ++i)
    {
      minGCD = Math.min(minGCD, gcd(a[i], a[i + 1]));
    }
    return minGCD;
  }
}
