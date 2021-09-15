package data.structures.java.heaps;

import java.util.Arrays;
import java.util.Collections;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

public class SetPartition
{
  //  Partition a set into two subsets such that the difference of subset sums is minimum
  //  Input:  arr[] = {1, 6, 11, 5}, sum of this array = 23
  //  Subset1 = {1, 5, 6}, sum of Subset1 = 12
  //  Subset2 = {11}, sum of Subset2 = 11
  //  Return minimum difference

  //  Approach shown here uses Karmarkar–Karp heuristic

  public static int findMinDifference(int [] a)
  {
    PriorityQueue<Integer> pq = new PriorityQueue<>(a.length, Collections.reverseOrder());

    for(int i : a)
    {
      pq.add(i);
    }

    while(pq.size() > 1)
    {
      int v1 = pq.poll();
      int v2 = pq.poll();
      pq.add(v1 - v2);
    }

    return pq.poll();
  }

  public static int findMinDifferenceRecursive(int [] a)
  {
    return data.structures.java.recursion.SetPartition.findMinDifference(a);
  }
}
