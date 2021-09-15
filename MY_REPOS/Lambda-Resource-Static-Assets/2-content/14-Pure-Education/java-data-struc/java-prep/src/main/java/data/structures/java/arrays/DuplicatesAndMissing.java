package data.structures.java.arrays;

import data.structures.java.strings.RemoveDups;
import java.util.Arrays;


public class DuplicatesAndMissing
{
  public static int duplicateInRange1ToN_1(int[] a)
  {
    //  Example: {4, 2, 1, 3, 2} n = 5, 2 is a duplicate
    int n = a.length;

    int expectedSum = (n - 1) * n / 2;
    int actualSum = Arrays.stream(a).sum();
    return actualSum - expectedSum;
  }

  public static int duplicateInRange0ToN_2(int[] a)
  {
    //  Example: {0, 2, 1, 3, 2} n = 5, 2 is a duplicate
    int n = a.length;

    int expectedSum = (n - 2) * (n - 1) / 2;
    int actualSum = Arrays.stream(a).sum();
    return actualSum - expectedSum;
  }

  public static int missingNumber(int[] a)
  {
    int startVal = a[0], endVal = a[a.length - 1];

    int expectedSum = endVal * (endVal + 1) / 2 - (startVal - 1) * startVal / 2;
    int actualSum = Arrays.stream(a).sum();

    return expectedSum - actualSum;
  }

  public static int[] removeAllDuplicates(int[] a)
  {
    if(a == null || a.length < 2)
    {
      return a;
    }

    int pos = 1;
    for(int i = 1; i < a.length; ++i)
    {
      int j;
      for(j = 0; j < pos; ++j)
      {
        if(a[i] == a[j])
        {
          break;
        }
      }
      if(j == pos)
      {
        a[pos++] = a[i];
      }
    }
    return Arrays.copyOf(a, pos);
  }

  public static int[] removeAllDuplicates1(int[] a)
  {
    return Arrays.stream(a).distinct().toArray();
  }

  public static String removeAllDuplicates(String s)
  {
    return RemoveDups.removeDups(s);
  }


  public static int getLonelyNumber(int[] arr)
  {
    //  All duplicates except one
    int val = arr[0];
    for(int i = 1; i < arr.length; ++i)
    {
      val ^= arr[i];
    }
    return val;
  }
}
