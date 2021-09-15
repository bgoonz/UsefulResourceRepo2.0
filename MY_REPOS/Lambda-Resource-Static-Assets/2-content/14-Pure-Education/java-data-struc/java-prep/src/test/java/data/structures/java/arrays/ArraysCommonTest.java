package data.structures.java.arrays;

import org.junit.Assert;
import org.junit.Test;

import java.util.Arrays;
import java.util.stream.IntStream;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;
import static org.junit.Assert.*;

public class ArraysCommonTest
{
  @Test
  public void findSecondMax()
  {
    int[] a = {9, 8, 7, 6, 5, 4, 3, 2, 1};
    assertEquals(8, ArraysCommon.findSecondMax(a));
  }

  @Test
  public void findSecondMax1()
  {
    int[] a = {9, 8, 7, 6, 5, 4, 3, 2, 1};
    assertEquals(8, ArraysCommon.findSecondMax1(a));
  }


  @Test
  public void removeValueFromArray()
  {
    int[] a = {1, 0, 2, 3, 5, 0, 0, 9};
    ArraysCommon.removeValueFromArray(a, 0);
    assertArrayEquals(new int[] {1, 2, 3, 5, 9, 0, 0, 9}, a);
  }

  @Test
  public void removeValueFromArray1()
  {
    int[] a = {1, 0, 2, 3, 5, 0, 0, 9};
    assertArrayEquals(new int[] {1, 2, 3, 5, 9}, ArraysCommon.removeValueFromArray1(a, 0));
  }


  @Test
  public void mergeSortedArrays()
  {
    int[] a = {1, 3, 5, 7};
    int[] b = {2, 6};

    int [] result = ArraysCommon.mergeSortedArrays(a, b);
    assertArrayEquals(new int[] {1, 2, 3, 5, 6, 7}, result);
  }

  @Test
  public void mergeSortedArrays1()
  {
    int[] a = {1, 3, 5, 7};
    int[] b = {2, 6};

    int [] result = ArraysCommon.mergeSortedArrays1(a, b);
    assertArrayEquals(new int[] {1, 2, 3, 5, 6, 7}, result);
  }

  @Test
  public void shuffleCards()
  {
    int[] arr = IntStream.rangeClosed(0, 51).toArray();
    int originalSum = Arrays.stream(arr).sum();
    ArraysCommon.shuffleCards(arr);
    int finalSum = Arrays.stream(arr).sum();
    assertEquals(52, arr.length);
    assertEquals(originalSum, finalSum);
  }

  @Test
  public void shuffleCards1()
  {
    int[] arr = IntStream.rangeClosed(0, 51).toArray();
    int originalSum = Arrays.stream(arr).sum();
    int [] finalAr = ArraysCommon.shuffleCards1(arr);
    int finalSum = Arrays.stream(finalAr).sum();
    assertEquals(52, finalAr.length);
    assertEquals(originalSum, finalSum);
  }

  @Test
  public void reverse()
  {
    int[] asc = IntStream.rangeClosed(0, 10).toArray();
    int[] desc = IntStream.rangeClosed(0, 10).map(i -> 10 - i + 0).toArray();
    ArraysCommon.reverse(asc);
    assertArrayEquals(asc, desc);
  }

  @Test
  public void reverse1()
  {
    int[] asc = IntStream.rangeClosed(0, 10).toArray();
    int[] desc = IntStream.rangeClosed(0, 10).map(i -> 10 - i + 0).toArray();

    int[] reversed = ArraysCommon.reverse1(asc);
    assertArrayEquals(reversed, desc);
  }

  @Test
  public void negativeBeforePositive()
  {
    int[] arr = {3, 0, -4, -7, 6, -6, -3};
    ArraysCommon.negativeBeforePositive(arr);
    assertArrayEquals(new int[] {-3, -6, -4, -7, 6, 0, 3}, arr);

    arr = new int[] {1, 2, 3, 4, -1, -2, -3, -4};
    ArraysCommon.negativeBeforePositive(arr);
    assertArrayEquals(new int[] {-4, -3, -2, -1, 4, 3, 2, 1}, arr);

    arr = new int[] {1, 2, 3, -1, -2, -3, -4};
    ArraysCommon.negativeBeforePositive(arr);
    assertArrayEquals(new int[] {-4, -3, -2, -1, 3, 2, 1}, arr);

    arr = new int[] {1, 2, 3, 4, -1, -2, -3};
    ArraysCommon.negativeBeforePositive(arr);
    assertArrayEquals(new int[] {-3, -2, -1, 4, 3, 2, 1}, arr);
  }

  @Test
  public void negativeBeforePositive1()
  {
    int [] arr = new int[] {1, 2, 3, -1, -2, -3, -4};
    int [] res = ArraysCommon.negativeBeforePositive1(arr);
    assertArrayEquals(new int[] {-1, -2, -3, -4, 1, 2, 3}, res);
  }

  @Test
  public void binarySearch()
  {
    int [] arr = {1, 3, 5, 7, 9, 11, 13, 15};
    int exists = ArraysCommon.binarySearch(arr, 13);
    int notFound = ArraysCommon.binarySearch(arr, 8);
    assertEquals(6, exists);
    assertEquals( -1, notFound);
  }

  @Test
  public void binarySearchInsert()
  {
    int [] arr = {1, 3, 5, 7, 9, 11, 13, 15};
    assertEquals(-4, ArraysCommon.binarySearchInsert(arr, 10));
  }

  @Test
  public void binarySearch1()
  {
    int [] arr = {1, 3, 5, 7, 9, 11, 13, 15};
    int exists = ArraysCommon.binarySearch1(arr, 13);
    int notFound = ArraysCommon.binarySearch1(arr, 8);
    assertEquals(6, exists);
    assertTrue( notFound < 0);
  }

  @Test
  public void generateRandomSubset()
  {
    int[] arr = IntStream.range(0, 51).toArray();
    int[] randomSet = ArraysCommon.generateRandomSubset(arr, 7);
    assertEquals(7, randomSet.length);
    assertTrue(AllUnique.allValuesUnique(randomSet));
  }

  @Test
  public void maxRepeatingNumber0_N()
  {
    int [] arr = {5, 3, 7, 5, 9, 17, 3, 9, 3};
    assertEquals(3, ArraysCommon.maxRepeatingNumber0_N(arr, 17));
  }

  @Test
  public void maxDifferenceBetweenTwoItems()
  {
    int[] ar = {1, 4, 5, 7, 6, 3, 2, 9};
    Assert.assertEquals(8, ArraysCommon.maxDifferenceBetweenTwoItems(ar));
  }

  @Test
  public void maxDifferenceBetweenTwoItems1()
  {
    int[] ar = {1, 4, 5, 7, 6, 3, 2, 9};
    Assert.assertEquals(8, ArraysCommon.maxDifferenceBetweenTwoItems1(ar));
  }

  @Test
  public void rotate()
  {
    int[] arr = {1, 2, 3, 4, 5, 6, 7};
    ArraysCommon.rotate(arr, 3);
    assertArrayEquals(new int[] {4, 5, 6, 7, 1, 2, 3}, arr);
  }

  @Test
  public void waveSort()
  {
    int [] a = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    ArraysCommon.waveSort(a);
    assertArrayEquals(new int[] {2, 1, 4, 3, 6, 5, 8, 7, 9}, a);
  }

  @Test
  public void medianFromTwoSortedArrays()
  {
    int [] a1 = {1, 3, 5};
    int [] a2 = {2, 4, 6};
    assertEquals(3.5, ArraysCommon.medianFromTwoSortedArrays(a1, a2), 0.0);

    a1 = new int[] {1, 3, 5};
    a2 = new int[] {2, 4};
    assertEquals(3.0, ArraysCommon.medianFromTwoSortedArrays(a1, a2), 0.0);

  }

}