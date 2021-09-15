package data.structures.java.recursion;

import java.util.Arrays;

public class SetPartition
{
  //  NOTE: refer to SetPartition in heaps package for easier to understand implementation

  public static int findMinDifference(int [] a)
  {
    //  Partition a set into two subsets such that the difference of subset sums is minimum
    //  Input:  arr[] = {1, 6, 11, 5}, sum of this array = 23
    //  Subset1 = {1, 5, 6}, sum of Subset1 = 12
    //  Subset2 = {11}, sum of Subset2 = 11
    //  Return minimum difference

    int sum = Arrays.stream(a).sum();
    return findMinDifference(a, a.length, 0, sum);
  }

  private static int findMinDifference(int[] a, int index, int sumComputed, int sumTotal)
  {
    if(index == 0)
    {
      return Math.abs(sumTotal - 2 * sumComputed);
    }

    int includeLast = findMinDifference(a, index - 1, sumComputed, sumTotal);
    int excludeLast = findMinDifference(a, index - 1, sumComputed + a[index - 1], sumTotal);
    return Math.min(excludeLast, includeLast);
  }

  public static int findMinDifferenceHeaps(int [] a)
  {
    return data.structures.java.heaps.SetPartition.findMinDifference(a);
  }


  public static boolean partitionWithEqualSums(int [] a)
  {
    //  Determine if array can be partitioned into two subsets of equal sum
    //  {1, 5, 11, 5} -> {11} & (1, 5, 5}
    int sum = Arrays.stream(a).sum();
    //  if sum is odd, there can not be two partitions that add to the same value
    if(sum % 2 != 0)
    {
      return false;
    }

    return  findMinDifferenceHeaps(a) == 0;
  }
}
