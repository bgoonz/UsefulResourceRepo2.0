package data.structures.java.sort;

import static data.structures.java.util.Common.swap;

public class BubbleSort
{
  private int[] data;

  public BubbleSort(int[] data)
  {
    this.data = data;
  }

  public int[] sort()
  {
    boolean swapped = false;
    do
    {
      swapped = false;
      for(int i = 1; i < data.length; ++i)
      {
        if(data[i] < data[i - 1])
        {
          swap(data, i, i - 1);
          swapped = true;
        }
      }
    } while(swapped);

    return data;
  }
}
