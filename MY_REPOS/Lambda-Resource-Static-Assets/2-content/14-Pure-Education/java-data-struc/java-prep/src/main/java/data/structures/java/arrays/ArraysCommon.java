package data.structures.java.arrays;


import java.util.*;
import java.util.stream.Collectors;

import static data.structures.java.util.Common.randomRange;
import static data.structures.java.util.Common.swap;

public class ArraysCommon
{
  public static int findSecondMax(int[] a)
  {
    if(a == null || a.length < 2)
    {
      return Integer.MIN_VALUE;
    }

    int max = Integer.MIN_VALUE;
    int secondMax = Integer.MIN_VALUE;

    for(int v : a)
    {
      if(v > max)
      {
        secondMax = max;
        max = v;
      }
      else if(v > secondMax)
      {
        secondMax = v;
      }
    }
    return secondMax;
  }

  public static int findSecondMax1(int[] a)
  {
    return Arrays.stream(a).boxed().sorted(Comparator.reverseOrder()).mapToInt(x -> x).limit(2).toArray()[1];
  }

  //  =======================================================================
  //  =======================================================================
  //  =======================================================================
  public static int removeValueFromArray(int[] a, int val)
  {
    int pos = 0;
    for(int v : a)
    {
      if(v != val)
      {
        a[pos++] = v;
      }
    }
    return pos;
  }

  public static int[] removeValueFromArray1(int[] a, int val)
  {
    return Arrays.stream(a).filter(x -> x != val).toArray();
  }

  //  =======================================================================
  //  =======================================================================
  //  =======================================================================
  public static int[] mergeSortedArrays(int[] a, int[] b)
  {
    int[] result = new int[a.length + b.length];

    int aMarker = 0, bMarker = 0, rMarker = 0;
    while (aMarker < a.length && bMarker < b.length)
    {
      if (a[aMarker] <= b[bMarker])
      {
        result[rMarker++] = a[aMarker++];
      }
      else
      {
        result[rMarker++] = b[bMarker++];
      }
    }
    while (aMarker < a.length)
    {
      result[rMarker++] = a[aMarker++];
    }
    while (bMarker < b.length)
    {
      result[rMarker++] = b[bMarker++];
    }
    return result;
  }

  public static int[] mergeSortedArrays1(int[] a, int[] b)
  {
    PriorityQueue<Integer> pq = new PriorityQueue<>(Arrays.stream(a).boxed().collect(Collectors.toList()));
    pq.addAll(Arrays.stream(b).boxed().collect(Collectors.toList()));

    int [] result = new int[a.length + b.length];
    int idx = 0;
    while(!pq.isEmpty())
    {
      result[idx++] = pq.poll();
    }
    return result;
  }

  public static double medianFromTwoSortedArrays(int [] a, int [] b)
  {
    int totalLength = a.length + b.length;
    int mid = (totalLength) / 2;

    int aPos = 0, bPos = 0;
    int val1 = 0, val2 = 0;
    while(aPos + bPos <= mid)
    {
      val1 = val2;
      if(aPos < a.length && bPos < b.length)
      {
        if(a[aPos] < b[bPos])
        {
          val2 = a[aPos++];
        }
        else
        {
          val2 = b[bPos++];
        }
      }
      else if(aPos < a.length)
      {
        val2 = a[aPos++];
      }
      else // bPos < b.length
      {
        val2 = b[bPos++];
      }
    }

    if(totalLength %2 == 1)
    {
      return val2;
    }
    else
    {
      return (val1 + val2) / 2.0;
    }
  }
  //  =======================================================================
  //  =======================================================================
  //  =======================================================================
  public static void shuffleCards(int[] cards)
  {
    int size = cards.length;
    for(int i = 0; i < size; ++i)
    {
      int randomIndex = randomRange(i, size);

      int temp = cards[i];
      cards[i] = cards[randomIndex];
      cards[randomIndex] = temp;
    }
  }

  public static int[] shuffleCards1(int[] cards)
  {
    List<Integer> list = Arrays.stream(cards).boxed().collect(Collectors.toList());
    Collections.shuffle(list);
    return list.stream().mapToInt(i -> i).toArray();
  }

  public static int[] generateRandomSubset(int[] a, int m)
  {
    int[] result = new int[m];

    for(int i = 0; i < m; ++i)
    {
      int randomIndex = randomRange(i, a.length);

      result[i] = a[randomIndex];
      a[randomIndex] = a[i];
    }
    return result;
  }

  //  =======================================================================
  //  =======================================================================
  //  =======================================================================
  public static void reverse(int[] a)
  {
    reverse(a, 0, a.length - 1);
  }

  private static void reverse(int[] a, int start, int end)
  {
    while( start < end)
    {
      int tmp = a[start];
      a[start++] = a[end];
      a[end--] = tmp;
    }
  }

  public static int[] reverse1(int[] a)
  {
    List<Integer> list = Arrays.stream(a).boxed().collect(Collectors.toList());
    Collections.reverse(list);
    return list.stream().mapToInt(i -> i).toArray();
  }

  //  =======================================================================
  //  =======================================================================
  //  =======================================================================
  public static void negativeBeforePositive(int [] a)
  {
    int start = 0, end = a.length - 1;
    while(start < end)
    {
      while(a[start] < 0) start++;
      while(a[end] > 0) end--;
      if(start < end)
      {
        int tmp = a[start];
        a[start++] = a[end];
        a[end--] = tmp;
      }
    }
  }

  public static int[] negativeBeforePositive1(int [] a)
  {
    //  Produces stable results
    Map<Boolean, List<Integer>> map = Arrays.stream(a).boxed().collect(Collectors.partitioningBy(x -> x > 0));
    int[] pos = map.get(true).stream().mapToInt(i -> i).toArray();
    int[] neg = map.get(false).stream().mapToInt(i -> i).toArray();

    int[] result = new int[a.length];
    System.arraycopy(neg, 0, result, 0, neg.length);
    System.arraycopy(pos, 0, result, neg.length, pos.length);
    return result;
  }

  //  =======================================================================
  //  =======================================================================
  //  =======================================================================
  public static int binarySearch(int[] a, int val)
  {
    int left = 0, right = a.length - 1;
    while(left < right)
    {
      int midIdx = (left + right) / 2;
      if(a[midIdx] == val)
      {
        return midIdx;
      }
      else if(a[midIdx] < val)
      {
        left = midIdx + 1;
      }
      else
      {
        right = midIdx - 1;
      }
    }
    return -1;
  }

  public static int binarySearch1(int[] a, int val)
  {
    List<Integer> list = Arrays.stream(a).boxed().collect(Collectors.toList());
    return Collections.binarySearch(list, val);
  }

  public static int binarySearchInsert(int[] a, int val)
  {
    //  If element is missing, return negative index where this value would be inserted
    int left = 0, right = a.length - 1;
    while(left < right)
    {
      int midIdx = (left + right) / 2;
      if(a[midIdx] == val)
      {
        return midIdx;
      }
      else if(a[midIdx] < val)
      {
        left = midIdx + 1;
      }
      else
      {
        right = midIdx - 1;
      }
    }
    return -left;
  }

  //  =======================================================================
  //  =======================================================================
  //  =======================================================================
  public static int maxRepeatingNumber0_N(int [] a, int max)
  {
    int [] check = new int[max + 1];
    for(int i : a)
    {
      check[i]++;
    }

    return Arrays.stream(check).max().getAsInt();
  }

  //  =======================================================================
  //  =======================================================================
  //  =======================================================================
  public static int maxDifferenceBetweenTwoItems(int [] arr)
  {
    if(arr == null || arr.length == 0)
    {
      return -1;
    }

    int min = arr[0];
    int max = arr[0];
    for(int i = 1; i < arr.length; ++i)
    {
      max = Math.max(max, arr[i]);
      min = Math.min(min, arr[i]);
    }

    return max - min;
  }

  public static int maxDifferenceBetweenTwoItems1(int [] arr)
  {
    return Arrays.stream(arr).max().getAsInt() - Arrays.stream(arr).min().getAsInt();
  }

  //  =======================================================================
  //  =======================================================================
  //  =======================================================================
  public static void rotate(int[] ar, int n)
  {
    if(ar == null || ar.length == 0 || ar.length < n)
    {
      return;
    }

    reverse(ar, 0, n - 1);
    reverse(ar, n, ar.length - 1);
    reverse(ar, 0, ar.length - 1);
  }

  public static void waveSort(int[] a)
  {
    //  arr[0] >= arr[1] <= arr[2] >= arr[3] <= arr[4]
    //  Input:  arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9}
    //  Output: arr[] = {2, 1, 4, 3, 6, 5, 9, 7, 8}

    for(int i = 1; i < a.length; i += 2)
    {
      if(i < a.length)
      {
        if(a[i - 1] < a[i])
        {
          swap(a, i - 1, i);
        }
      }
    }
  }

}
