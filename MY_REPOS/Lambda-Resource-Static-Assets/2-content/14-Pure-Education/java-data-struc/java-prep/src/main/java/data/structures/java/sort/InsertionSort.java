package data.structures.java.sort;

import static data.structures.java.util.Common.swap;

public class InsertionSort
{
  public static int[] sort(int[] input)
  {
    for(int i = 1; i < input.length; ++i)
    {
      for(int j = i; j > 0; --j)
      {
        if(input[j] < input[j - 1])
        {
          swap(input, j, j - 1);
        }
      }
    }
    return input;
  }
}
