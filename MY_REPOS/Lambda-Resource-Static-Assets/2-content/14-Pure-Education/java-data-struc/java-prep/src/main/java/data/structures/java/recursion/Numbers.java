package data.structures.java.recursion;

public class Numbers
{
  public static int add(int a, int b)
  {
    if (b == 0) return a;
    int sum = a ^ b;
    int carry = (a & b) << 1;
    return add(sum, carry);
  }

  public static int multiply(int a, int b)
  {
    if(b == 0) return 0;
    if(b % 2 == 0 )
    {
      return multiply(a + a, b / 2);
    }
    return multiply(a + a, b / 2 ) + a;
  }

  public static int exponent(int a, int b)
  {
    if(b == 0)
    {
      return 1;
    }

    if(b % 2 == 0)
    {
      return exponent(a * a, b / 2);
    }
    return exponent(a * a, b / 2 ) * a;
  }

  public static boolean isPowerOfTen(int n)
  {
    if(n % 10 != 0 || n == 0)
    {
      return false;
    }

    if(n == 10)
    {
      return true;
    }

    return isPowerOfTen(n / 10);
  }

  public static int gcd(int a, int b)
  {
    if(b == 0)
    {
      return a;
    }

    return gcd( b, a % b);
  }

  static String toBinary(int n, StringBuilder sb)
  {
    if(n == 0)
    {
      return "";
    }

    toBinary(n / 2, sb);
    sb.append(n % 2);
    return sb.toString();
  }
}
