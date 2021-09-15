package data.structures.java.numbers;

import java.util.Arrays;
import java.util.Comparator;
import java.util.stream.Collectors;

public class NumbersCommon
{
  static int digitsInNumber(int num)
  {
    return (int)Math.log10(num) + 1;
  }

  public static int numericStringToNum(String s)
  {
    char[] ar = s.toCharArray();

    int n = 0;
    for(char c : ar)
    {
      n = n * 10 + c - '0';
    }
    return n;
  }

  public static boolean isPalindrome(int n)
  {
    int original = n;
    int reversed = 0;

    while(n > 0)
    {
      reversed = reversed * 10 + n % 10;
      n /= 10;
    }
    return original == reversed;
  }

  public static String toBinary(int n)
  {
    StringBuilder sb = new StringBuilder();
    while(n > 0)
    {
      sb.append(n % 2);
      n /= 2;
    }
    return sb.reverse().toString();
  }


  public static int squareRoot(int n)
  {
    //  Note: use low <= high and inc/dec mid (low = mid + 1), (high = mid - 1)
    if(n < 2)
    {
      return n;
    }

    int low = 1, high = n / 2;
    while (low <= high)
    {
      int mid = (low + high) / 2;
      int sqr = mid * mid;
      if(sqr == n)
      {
        return mid;
      }
      else if(sqr < n)
      {
        low = mid + 1;
      }
      else
      {
        high = mid - 1;
      }
    }
    return -1;
  }

  public static int fibonacci1(int n)
  {
    if(n < 0)
    {
      return -1;
    }
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

  public static int fibonacci2(int n)
  {
    if(n < 0)
    {
      return -1;
    }
    if(n < 2)
    {
      return n;
    }

    int[] fibArray = new int[n + 1];
    fibArray[0] = 0;
    fibArray[1] = 1;

    for(int i = 2; i <= n; ++i)
    {
      fibArray[i] = fibArray[i - 2] + fibArray[i - 1];
    }
    return fibArray[n];
  }

  public static int makeBiggestNumberFromIntArray(int[] ar)
  {
    String[] strArray = Arrays.stream(ar).mapToObj(String::valueOf).toArray(String[]::new);

    Arrays.sort(strArray, (s1, s2) -> {
            String leftRight = s1 + s2;
            String rightLeft = s2 + s1;
            return rightLeft.compareTo(leftRight);
          });
    String numStr = Arrays.stream(strArray).collect(Collectors.joining());
    return Integer.valueOf(numStr);
  }

  public static String romanNumeral(int num)
  {
    String[] romSym = {"M","CM","D","CD", "C","XC","L","XL","X","IX","V","IV","I"};
    int[] decimals = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};

    StringBuilder sb = new StringBuilder();
    for(int i = 0; i < decimals.length; ++i)
    {
      while(num >= decimals[i])
      {
        sb.append(romSym[i]);
        num -= decimals[i];
      }
      if(num == 0)
      {
        break;
      }
    }
    return sb.toString();
  }

  private static int rand5()
  {
    return (int)(Math.random() * 5);
  }
  public static int rand7usingRand5()
  {
    while(true)
    {
      int mod2 = rand5();
      if(mod2 != 4)
      {
        mod2 %= 2;
        int r1 = rand5() * 2;
        int num = r1 + mod2;
        if(num < 7)
        {
          return num;
        }
      }
    }
  }


  public static int trailingZerosInFactorial(int n)
  {
    if(n < 0)
    {
      return -1;
    }
    int count = 0;

    while(n > 0)
    {
      count += n / 5;
      n /= 5;
    }

    return count;
  }

  public static boolean powerOfTen(int num)
  {
    while(num > 9 && num % 10 == 0)
    {
      num /= 10;
    }
    return num == 1;
  }
}
