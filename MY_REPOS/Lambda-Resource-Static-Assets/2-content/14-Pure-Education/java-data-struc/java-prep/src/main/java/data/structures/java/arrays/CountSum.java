package data.structures.java.arrays;

import data.structures.java.dynamic.PerfectSquares;
import data.structures.java.recursion.NSum;

import java.util.*;

public class CountSum
{
  public static int countTwoSum(int[] a, int target)
  {
    //  Relies on sort which is n*log(n)
    int count = 0;
    Arrays.sort(a);
    int start = 0, end = a.length - 1;
    while(start < end)
    {
      int sum = a[start] + a[end];
      if(sum == target)
      {
        count++;
        start++;
        end--;
      }
      else if (sum < target)
      {
        start++;
      }
      else
      {
        end--;
      }
    }
    return count;
  }

  public static int countTwoSum1(int[] a, int target)
  {
    Map<Integer,Integer> map = new HashMap<>();
    map.put(a[0], 1);

    int count = 0;
    for(int i = 1; i < a.length; ++i)
    {
      if(map.containsKey(target - a[i]))
      {
        count += map.get(target - a[i]);
      }
      map.merge(a[i], 1, Integer::sum);
    }
    return count;
  }


  public static List<List<Integer>> countFourSum(int[] a, int val)
  {
    List<List<Integer>> result = new ArrayList<>();

    Arrays.sort(a);

    for(int i = 0; i < a.length; ++i)
    {
      for(int j = i + 1; j < a.length; ++j)
      {
        int k = j + 1;
        int l = a.length - 1;

        while(k < l)
        {
          int sum = a[i] + a[j] + a[k] + a[l];
          if (sum == val)
          {
            List<Integer> tmp = Arrays.asList(i, j, k, l);
            result.add(tmp);
            k++;
            l--;
          }
          else if (sum < val)
          {
            k++;
          }
          else
          {
            l--;
          }
        }
      }
    }
    return result;
  }

  public static List<List<Integer>> threeSumClosest(int[] ar, int target)
  {
    List<List<Integer>> result = new ArrayList<>();

    List<List<Integer>> minResult = new ArrayList<>();
    int min = Integer.MAX_VALUE;

    Arrays.sort(ar);

    for(int i = 0; i < ar.length; ++i)
    {
      int j = i + 1;
      int k = ar.length - 1;

      while (j < k)
      {
        int sum = ar[i] + ar[j] + ar[k];

        int diff = target - sum;
        if (diff == 0)
        {
          result.add(Arrays.asList(ar[i], ar[j], ar[k]));
          return result;
        }

        if(diff > 0)
        {
          if (diff <= min)
          {
            if (diff < min)
            {
              min = diff;
              minResult.clear();
            }
            minResult.add(Arrays.asList(ar[i], ar[j], ar[k]));
          }
        }

        if (sum < target)
        {
          j++;
        }
        else
        {
          k--;
        }
      }
    }

    return minResult;
  }

  public static List<int[]> countNSum(int[] a, int val)
  {
    NSum nSum = new NSum(a, val);
    return nSum.generateSubsets();
  }

  public static int maxSum(int[] a)
  {
    int sum = 0, maxSum = 0;

    for(int i : a)
    {
      sum += i;
      if(sum > maxSum)
      {
        maxSum = sum;
      }
      if(sum < 0)
      {
        sum = 0;
      }
    }
    return maxSum;
  }

  public static int leastSumOfPerfectSquares(int n)
  {
    return PerfectSquares.leastNumberOfPerfectSquares(n);
  }

  public static int numberOfSubArraySums(int[] arr, int target)
  {
    //  Count number of sub-arrays that add to a given sum
    int count = 0;
    for(int i = 0; i < arr.length; ++i)
    {
      int sum = arr[i];
      for(int j = i + 1; j < arr.length; ++j)
      {
        if(sum == target)
        {
          count++;
          break;
        }
        sum += arr[j];
      }
    }
    return count;
  }

  public static int lengthOfSmallestSubArrayWithSumGreaterThanN(int[] a, int n)
  {
    int min = Integer.MAX_VALUE;

    for(int i = 0; i < a.length; ++i)
    {
      int sum = a[i];
      if(sum > n)
      {
        return 1;
      }
      for(int j = i + 1; j < a.length; ++j)
      {
        sum += a[j];
        if(sum > n)
        {
          min = Math.min(min, j - i + 1);
          break;
        }
      }
    }
    return min;
  }
}
