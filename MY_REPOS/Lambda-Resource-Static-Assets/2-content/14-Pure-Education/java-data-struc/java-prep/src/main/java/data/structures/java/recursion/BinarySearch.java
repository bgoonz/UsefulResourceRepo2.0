package data.structures.java.recursion;

public class BinarySearch
{
  public static int binarySearch(int[] arr, int val)
  {
    return binarySearch(arr, 0, arr.length - 1, val);
  }

  private static int binarySearch(int[] arr, int low, int high, int val)
  {
    if(high < low)
    {
      return -1;
    }

    int mid = (low + high) / 2;
    if(arr[mid] == val)
    {
      return mid;
    }
    else if(arr[mid] > val)
    {
      return binarySearch(arr, low, mid - 1, val);
    }
    else
    {
      return binarySearch(arr, mid + 1, high, val);
    }
  }
}
