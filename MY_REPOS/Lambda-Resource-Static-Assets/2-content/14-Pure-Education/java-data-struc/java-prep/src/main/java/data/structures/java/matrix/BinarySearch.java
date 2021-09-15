package data.structures.java.matrix;

public class BinarySearch
{
  public static int binarySearch(int[][] data, int val)
  {
    return binarySearch(data, 0, data.length * data[0].length - 1, val);
  }

  private static int binarySearch(int[][] data, int start, int end, int find)
  {
    int rows = data.length;
    int cols = data[0].length;

    while(start < end)
    {
      int mid = (start + end) / 2;
      int val = data[mid / rows][mid % cols];
      if(val == find)
      {
        return mid;
      }
      else if(val < find)
      {
        start = mid;
      }
      else
      {
        end = mid;
      }
    }

    return -1;
  }
}
