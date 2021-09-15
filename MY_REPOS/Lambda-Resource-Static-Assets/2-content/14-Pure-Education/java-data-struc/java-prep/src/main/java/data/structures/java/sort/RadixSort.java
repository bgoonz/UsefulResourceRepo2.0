package data.structures.java.sort;


import java.util.Arrays;

public class RadixSort
{
  /*
  Use LSD (least significant digit) method by repeatedly sorting digits by single digit from right to left
  Given: { 170, 45, 75, 90, 802, 2, 66 }
  Treat all values as having same number of digits:
  Given: { 170, 045, 075, 090, 802, 002, 066 }
  1st Pass: { 170, 090, 802, 002, 045, 075, 066 }
  2nd Pass: { 802, 002, 045, 066, 170, 075, 090 }
  3rd Pass: { 002, 045, 066, 075, 090, 170, 802 }
   */
  private int[] data;
  public RadixSort(int[] ar)
  {
    this.data = ar;
  }

  public int[] sort()
  {
    //  Find number of digits for max value in array;
    int max = Arrays.stream(data).max().getAsInt();
    int digits = (int)Math.log10(max) + 1;
    for(int exp = 0; exp < digits; ++exp)
    {
      countSort((int)Math.pow(10, exp));
    }
    return data;
  }

  private void countSort(int exp)
  {
    //  Considering input as: { 170, 045, 075, 090, 802, 002, 066 }

    int [] count = new int[10];

    for(int i = 0; i < data.length; ++i)
    {
      count[data[i] / exp % 10]++;
    }
    //  count after:
    //  Index        0  1  2  3  4  5  6  7  8  9
    //  ------------------------------------------
    //    1st pass: {2, 0, 2, 0, 0, 2, 1, 0, 0, 0}
    //    2nd pass: {2, 2, 2, 0, 0, 2, 1, 0, 0, 0}
    //    3rd pass: {2, 2, 4, 0, 0, 2, 1, 0, 0, 0}

    for(int i = 1; i < 10; ++i)
    {
      count[i] += count[i - 1];
    }
    //  count after:
    //    1st pass: {2, 2, 4, 4, 4, 6, 7, 7, 7, 7}
    //    2nd pass: {2, 2, 2, 2, 3, 3, 4, 6, 6, 7}
    //    3rd pass: {5, 6, 6, 6, 6, 6, 6, 6, 7, 7}

    int [] output = new int[data.length];
    for(int i = data.length - 1; i >= 0; i--)
    {
      output[count[(data[i]) / exp % 10] - 1] = data[i];
      count[(data[i]) / exp % 10]--;
    }

    System.arraycopy(output, 0, data, 0, data.length);
  }
}
