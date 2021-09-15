package data.structures.java.arrays;

import java.util.Arrays;

public class PushZeros
{
  public static void pushZerosToBack(int[] a)
  {
    int pos = 0;

    for(int v : a)
    {
      if(v != 0)
      {
        a[pos++] = v;
      }
    }

    while(pos < a.length)
    {
      a[pos++] = 0;
    }
  }

  public static int[] pushZerosToBack1(int[] a)
  {
    long numZeros = Arrays.stream(a).filter(i -> i == 0).count();
    int [] nonZeros = Arrays.stream(a).filter(i -> i != 0).toArray();

    int[] result = new int[a.length];
    System.arraycopy(nonZeros, 0, result, 0, nonZeros.length);
    Arrays.fill(result, nonZeros.length, nonZeros.length + (int)numZeros, 0);
    return result;
  }

  public static void pushZerosToFront(int[] a)
  {
    int pos = a.length - 1;
    for(int i = a.length - 1; i >= 0; --i)
    {
      if(a[i] != 0)
      {
        a[pos--] = a[i];
      }
    }
    while( pos >= 0)
    {
      a[pos--] = 0;
    }
  }

  public static int[]  pushZerosToFront1(int[] a)
  {
    long numZeros = Arrays.stream(a).filter(i -> i == 0).count();
    int [] nonZeros = Arrays.stream(a).filter(i -> i != 0).toArray();

    int[] result = new int[a.length];
    Arrays.fill(result, 0, (int)numZeros, 0);
    System.arraycopy(nonZeros, 0, result, (int)numZeros, nonZeros.length);
    return result;

  }

}
