package data.structures.java.stacksqueues;

import java.util.*;
import java.util.stream.Collectors;

public class Intervals
{
  public static List<int []> mergeIntervals(int[][] input)
  {
    //  Sort by starting times
    Arrays.sort(input, Comparator.comparingInt((int[] ar) -> ar[0]));

    Stack<int[]> stack = new Stack<>();
    stack.push(input[0]);

    for(int i = 1 ; i < input.length; ++i)
    {
      //  If start time of current interval is <= to end time of prior interval - merge
      if(input[i][0] <= stack.peek()[1])
      {
        //  If end time of current interval is > than end time of the prior interval, modify prior interval
        if(input[i][1] > stack.peek()[1])
        {
          int[] item = stack.pop();
          item[1] = input[i][1];
          stack.push(item);
        }
      }
      else
      {
        stack.push(input[i]);
      }
    }

    List<int[]> result = stack.stream().collect(Collectors.toList());
    return result;
  }

  //  ===========================================================================
  //  ===========================================================================
  //  ===========================================================================
  public static int areaOverlappingRectangle(int[][] r1, int[][] r2)
  {
    int[][] xIntervals = new int[][] {
        {r1[0][0], r1[1][0]},
        {r2[0][0], r2[1][0]},
    };
    int[][] yIntervals = new int[][] {
        {r1[0][1], r1[1][1]},
        {r2[0][1], r2[1][1]},
    };

    //  Sort intervals
    Arrays.sort(xIntervals, Comparator.comparingInt((int [] a) -> a[0]));
    Arrays.sort(yIntervals, Comparator.comparingInt((int [] a) -> a[1]));

    //  Both intervals must overlap
    if(!(xIntervals[0][0] < xIntervals[1][0] || yIntervals[0][1] < yIntervals[1][1]))
    {
      return 0;
    }

    int w = xIntervals[0][1] - xIntervals[1][0];
    int h = yIntervals[0][1] - yIntervals[1][0];

    return w * h;
  }
}
