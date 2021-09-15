package data.structures.java.bits;

public class BitsCommon
{
  public static int polarity(int n)
  {
    int count = 0;
    for(int i = n; i > 0; i >>= 1)
    {
      count += (i & 1);
    }
    return count;
  }

  public static boolean isUniqueAllLowerCase(String str)
  {
    int check = 0;
    for(char c : str.toCharArray())
    {
      int val = c - 'a';
      if((check & (1 << val)) > 0)
      {
        return false;
      }
      check |= (1 << val);
    }
    return true;
  }

  static int max(int a, int b)
  {
    int c = a - b;
    int sign = (c >> 31) & 1;
    return a - c * sign;
  }
}
