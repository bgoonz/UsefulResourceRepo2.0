package data.structures.java.heaps;

import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

public class LongestConsecutiveSequence
{
  public static int longestConsecutiveSequence(int [] ar)
  {
    // {100, 4, 20, 2, 1, 3, 21, 19} -> {1, 2, 3, 4}
    PriorityQueue<Integer> pq = new PriorityQueue<Integer>(Arrays.stream(ar).boxed().collect(Collectors.toList()));
    int max = Integer.MIN_VALUE;
    int count = 1;
    int minValue = pq.poll();
    while(!pq.isEmpty())
    {
      int nextVal = pq.poll();
      if(nextVal - 1 == minValue)
      {
        count++;
        max = Math.max(max, count);
        minValue = nextVal;
      }
      else
      {
        count = 1;
      }
    }
    return max;
  }
}
