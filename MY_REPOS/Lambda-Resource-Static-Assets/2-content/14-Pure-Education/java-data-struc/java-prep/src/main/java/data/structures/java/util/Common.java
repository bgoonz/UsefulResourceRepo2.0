package data.structures.java.util;

import java.util.Arrays;
import java.util.stream.IntStream;

public class Common
{
  public static int randomRange(int lower, int upper)
  {
    return lower + (int)(Math.random() * (upper - lower));
  }

  public static<T> void swap(T[] arr, int idx1, int idx2)
  {
    T temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }

  public static void swap(int[] arr, int idx1, int idx2)
  {
    int temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }

}
