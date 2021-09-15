package data.structures.java.dynamic;

public class RainWater
{
  //  To compute "ALL" water trapped.
  //  heights = 0  1  0  2  1  0  1  3  2  1  2  1
  //  left    = 0  1  1  2  2  2  2  3  3  3  3  3  //  height the left side can support
  //  right   = 3  3  3  3  3  3  3  3  2  2  2  1  //  height the right side can support
  //  diff    = 0  0  1  0  1  2  1  0  0  1  0  0 = 6  //  min(left, right) - height



  public static int trapAllRainWater(int[] heights)
  {
    if(heights == null || heights.length < 2)
    {
      return 0;
    }

    int left[] = new int[heights.length];
    left[0] = heights[0];
    for(int i = 1; i < heights.length; i++)
    {
      left[i] = Math.max(heights[i], left[i - 1]);
    }


    int right[]= new int[heights.length];
    right[heights.length - 1] = heights[heights.length - 1];
    for(int i = heights.length - 2; i >= 0; --i)
    {
      right[i] = Math.max(heights[i], right[i + 1]);
    }

    //calculate total
    int total = 0;
    for(int i = 0; i < heights.length; i++)
    {
      total += Math.min(left[i], right[i]) - heights[i];
    }

    return total;
  }


  public static int containerWithMostWater(int[] heights)
  {
    if(heights == null || heights.length < 2)
    {
      return 0;
    }

    int max = 0;
    int left = 0;
    int right = heights.length - 1;

    while(left < right)
    {
      max = Math.max(max, (right - left) * Math.min(heights[left], heights[right]));

      if(heights[left] < heights[right])
      {
        left++;
      }
      else
      {
        right--;
      }
    }
    return max;
  }


}
