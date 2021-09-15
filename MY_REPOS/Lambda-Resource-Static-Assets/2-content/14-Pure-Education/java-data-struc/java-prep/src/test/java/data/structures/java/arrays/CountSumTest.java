package data.structures.java.arrays;

import org.junit.Assert;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.*;

public class CountSumTest
{

  @Test
  public void countTwoSum()
  {
    int[] a = {9, 1, 8, 2, 7, 3, 6, 4, 5};
    int count = CountSum.countTwoSum(a, 10);
    assertEquals(4, count);

  }

  @Test
  public void countTwoSum1()
  {
    int[] a = {9, 8, 7, 6, 5, 4, 3, 2, 1};
    int count = CountSum.countTwoSum1(a, 10);
    assertEquals(4, count);

    a = new int[] {9, 1};
    count = CountSum.countTwoSum1(a, 10);
    assertEquals(1, count);
  }

  @Test
  public void countFourSum()
  {
    int[] a = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    List<List<Integer>> result = CountSum.countFourSum(a, 10);
    assertEquals(1, result.size());
    int[] array = result.get(0).stream().mapToInt(i -> i).toArray();
    assertArrayEquals(new int[] {0, 1, 2, 3}, array);
  }

  @Test
  public void threeSumClosest()
  {
    int[] a1 = {4, 1, 8, 0, 6, 2, 9};
    List<List<Integer>> result = CountSum.threeSumClosest(a1, 15);
    assertEquals(1, result.size());
    assertArrayEquals(new int[] {0, 6, 9}, result.get(0).stream().mapToInt(i ->i).toArray());

    int[] a2 = {4, -7, 8, 0, 6, 2, -3};
    result = CountSum.threeSumClosest(a2, 15);
    assertEquals(2, result.size());
    assertArrayEquals(new int[] {0, 6, 8}, result.get(0).stream().mapToInt(i ->i).toArray());
    assertArrayEquals(new int[] {2, 4, 8}, result.get(1).stream().mapToInt(i ->i).toArray());
  }

  @Test
  public void countNSum()
  {
    int [] data = {1, 3, 4, 5, 6, 8, 15};

    List<int[]> results = CountSum.countNSum(data ,15);

    Assert.assertEquals(5, results.size());

    for(int i = 0; i < 5; ++i)
    {
      int[] result = results.get(i);
      assertTrue(Arrays.equals(new int[] {15}, result) ||
          Arrays.equals(new int[] {1,3,5,6}, result) ||
          Arrays.equals(new int[] {1,6,8}, result) ||
          Arrays.equals(new int[] {3,4,8}, result) ||
          Arrays.equals(new int[] {4,5,6}, result));
    }
  }


  @Test
  public void maxSum()
  {
    int[] arr = {-4, 3, 2, 7, -8, 11, 1, -3};
    assertEquals(16, CountSum.maxSum(arr));
  }

  @Test
  public void leastSumOfPerfectSquares()
  {
    assertEquals(3, CountSum.leastSumOfPerfectSquares(12));
    assertEquals(2, CountSum.leastSumOfPerfectSquares(13));

  }

  @Test
  public void numberOfSubarraySums()
  {
    assertEquals(2, CountSum.numberOfSubArraySums(new int[] {9, 4, 20, 3, 10, 5}, 33));

  }

  @Test
  public void smallestSubArrayWithSumGreaterThanN()
  {
    assertEquals(3, CountSum.lengthOfSmallestSubArrayWithSumGreaterThanN(new int[] {1, 4, 45, 6, 0, 19}, 51));
    assertEquals(1, CountSum.lengthOfSmallestSubArrayWithSumGreaterThanN(new int[] {1, 10, 5, 2, 7}, 9));
    assertEquals(4, CountSum.lengthOfSmallestSubArrayWithSumGreaterThanN(new int[] {1, 11, 100, 1, 0, 200, 3, 2, 1, 250}, 280));
  }

}