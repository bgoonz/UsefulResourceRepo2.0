package data.structures.java.arrays;


public class MostCommonNumber
{
  //  Given a set of consecutive number ranges. Find the most common number.
  //  We can be assured that second dimension is >= than first
  //  Given: {1, 6}, {2, 5}, {3, 8}, {5, 7}
  //  The most popular number would be 5

  //  Same approach can be used to figure out which people are alive on a give year, for Example:
  /*  Person  Year Born Year Died
      ---------------------------
      A       1958      1988
      B       1961      1999
      ..      ...       ...
   */


  private int[][] ranges;
  private int[] countArray;

  public MostCommonNumber(int[][] data)
  {
    ranges = data;
    //  Iterate through all ranges and find the max value
    int max = Integer.MIN_VALUE;
    for(int i = 0; i < ranges.length; ++i)
    {
      for(int j = 0; j < ranges[0].length; ++j)
      {
        max = Math.max(max, ranges[i][j]);
      }
    }

    //  Once we know the max, init array
    countArray = new int[max + 1];
  }

  public int findMostCommon()
  {
    int max = Integer.MIN_VALUE;
    int maxIndex = Integer.MIN_VALUE;
    for(int[] range : ranges)
    {
      for(int i = range[0]; i <= range[1]; ++i)
      {
        countArray[i]++;
        if(countArray[i] > max)
        {
          max = countArray[i];
          maxIndex = i;
        }
      }
    }
    return maxIndex;
  }
}
