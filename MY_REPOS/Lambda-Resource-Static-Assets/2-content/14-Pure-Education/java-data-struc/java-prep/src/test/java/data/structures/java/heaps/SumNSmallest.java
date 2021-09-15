package data.structures.java.heaps;

import java.util.PriorityQueue;

public class SumNSmallest
{
  public static int sumOfNSmallest(int[] data, int n)
  {
    PriorityQueue<Integer> pq = new PriorityQueue<>(20);
    for(int i : data)
    {
      pq.offer(i);
    }
    int sum = 0;
    for(int i = 0; i < n; ++i)
    {
      sum += pq.poll();
    }

    return sum;
  }
}
