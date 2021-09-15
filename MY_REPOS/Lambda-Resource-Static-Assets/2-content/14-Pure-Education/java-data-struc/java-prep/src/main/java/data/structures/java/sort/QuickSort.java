package data.structures.java.sort;

import static data.structures.java.util.Common.swap;

public class QuickSort
{
  private int[] data;

  public QuickSort(int [] data)
  {
    this.data = data;
  }

  public int[] sort()
  {
    sort(data, 0, data.length - 1);
    return data;
  }


  private void sort(int[] ar, int left, int right)
  {
    int idx = partition(ar, left, right);

    if(left < idx - 1)
    {
      sort(ar, left, idx - 1);
    }
    if(idx < right)
    {
      sort(ar, idx, right);
    }
  }

  private int partition(int[] ar, int left, int right)
  {
    int pivot = ar[(left + right) / 2];

    while(left <= right)
    {
      while(ar[left] < pivot) left++;
      while(ar[right] > pivot) right--;
      if(left <= right)
      {
        swap(ar, left++, right--);
      }
    }
    return left;
  }

}
