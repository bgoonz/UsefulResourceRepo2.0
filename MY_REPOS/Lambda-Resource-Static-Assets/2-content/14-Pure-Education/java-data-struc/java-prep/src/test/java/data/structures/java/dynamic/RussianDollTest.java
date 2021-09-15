package data.structures.java.dynamic;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class RussianDollTest
{
  RussianDoll russianDoll;
  @Before
  public void setUp() throws Exception
  {
    int[][] envelopes = {
        {7, 9},
        {9, 7},
        {9, 8},
        {9, 10},
        {10, 8},
        {11, 5},
        {8, 6},
    };
    russianDoll = new RussianDoll(envelopes);
  }

  @Test
  public void sort()
  {
    russianDoll.sort();
    assertArrayEquals(new int[] {7, 9}, russianDoll.envelopes[0]);
    assertArrayEquals(new int[] {8, 6}, russianDoll.envelopes[1]);
    assertArrayEquals(new int[] {9, 10}, russianDoll.envelopes[2]);
    assertArrayEquals(new int[] {9, 8}, russianDoll.envelopes[3]);
    assertArrayEquals(new int[] {9, 7}, russianDoll.envelopes[4]);
    assertArrayEquals(new int[] {10, 8}, russianDoll.envelopes[5]);
    assertArrayEquals(new int[] {11, 5}, russianDoll.envelopes[6]);
  }

  @Test
  public void russianDoll()
  {
    russianDoll.sort();
    assertEquals(2, russianDoll.russianDollCount());
  }
}