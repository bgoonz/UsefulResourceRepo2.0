package data.structures.java.numbers;

import org.junit.Test;

import static org.junit.Assert.*;

public class StaircaseHeightTest
{

  @Test
  public void height()
  {
    assertEquals(1, StaircaseHeight.height(1));
    assertEquals(1, StaircaseHeight.height(2));
    assertEquals(2, StaircaseHeight.height(3));
    assertEquals(2, StaircaseHeight.height(4));
    assertEquals(3, StaircaseHeight.height(6));
    assertEquals(4, StaircaseHeight.height(10));
    assertEquals(5, StaircaseHeight.height(15));
    assertEquals(10, StaircaseHeight.height(55));
  }
}