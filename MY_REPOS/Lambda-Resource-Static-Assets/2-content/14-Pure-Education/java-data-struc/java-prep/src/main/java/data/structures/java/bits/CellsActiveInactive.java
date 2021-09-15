package data.structures.java.bits;


public class CellsActiveInactive
{
  public static int[] switchCells(int[] cells, int days)
  {
    int [] temp = new int[cells.length + 2];
    System.arraycopy(cells, 0, temp, 1, cells.length);
    int [] result = new int[cells.length];

    for(int i = 0; i < days; i++)
    {
      for(int j = 0; j < temp.length - 2; ++j)
      {
        result[j] = temp[j] ^ temp[j + 2];
      }
      System.arraycopy(result, 0, temp, 1, result.length);
    }

    return result;
  }
}

