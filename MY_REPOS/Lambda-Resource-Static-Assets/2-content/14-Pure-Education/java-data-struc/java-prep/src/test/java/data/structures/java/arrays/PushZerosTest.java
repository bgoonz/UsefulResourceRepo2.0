package data.structures.java.arrays;

import org.junit.Test;

import static org.junit.Assert.*;

public class PushZerosTest
{

  @Test
  public void pushZerosToBack()
  {
    int[] a = {1, 0, 2, 3, 5, 0, 0, 9};
    PushZeros.pushZerosToBack(a);
    assertArrayEquals(new int[] {1, 2, 3, 5, 9, 0, 0, 0,}, a);
  }

  @Test
  public void pushZerosToBack1()
  {
    int[] a = {1, 0, 2, 3, 5, 0, 0, 9};
    int [] res = PushZeros.pushZerosToBack1(a);
    assertArrayEquals(new int[] {1, 2, 3, 5, 9, 0, 0, 0,}, res);
  }

  @Test
  public void pushZerosToFront()
  {
    int[] a = {1, 0, 2, 3, 5, 0, 0, 9};
    PushZeros.pushZerosToFront(a);
    assertArrayEquals(new int[] {0, 0, 0, 1, 2, 3, 5, 9}, a);
  }

  @Test
  public void pushZerosToFront1()
  {
    int[] a = {1, 0, 2, 3, 5, 0, 0, 9};
    int [] res = PushZeros.pushZerosToFront1(a);
    assertArrayEquals(new int[] {0, 0, 0, 1, 2, 3, 5, 9}, res);
  }
}