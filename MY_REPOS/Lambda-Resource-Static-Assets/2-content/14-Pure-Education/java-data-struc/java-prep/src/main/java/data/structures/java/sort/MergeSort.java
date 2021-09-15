package data.structures.java.sort;

public class MergeSort
{
  private int[] data;

  public MergeSort(int[] data)
  {
    this.data = data;
  }

  public int[] sort()
  {
    return sort(data);
  }

  private int[] sort(int [] ar)
  {
    if(ar.length < 2)
    {
      return ar;
    }

    int mid = ar.length / 2;
    int[] left = new int[mid];
    int[] right = new int[ar.length - mid];

    System.arraycopy(ar, 0, left, 0, left.length);
    System.arraycopy(ar, mid, right, 0, right.length);
    sort(left);
    sort(right);
    return merge(ar, left, right);
  }

  private int[] merge(int[] dst, int[] left, int[] right)
  {
    int m1 = 0, m2 = 0, m3 = 0;

    while(m2 < left.length && m3 < right.length)
    {
      if(left[m2] < right[m3])
      {
        dst[m1++] = left[m2++];
      }
      else
      {
        dst[m1++] = right[m3++];
      }
    }
    while(m2 < left.length)
    {
      dst[m1++] = left[m2++];
    }
    while(m3 < right.length)
    {
      dst[m1++] = right[m3++];
    }
    return dst;
  }
}
