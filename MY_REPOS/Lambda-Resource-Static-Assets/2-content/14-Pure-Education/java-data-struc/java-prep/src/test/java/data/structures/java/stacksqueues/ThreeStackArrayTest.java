package data.structures.java.stacksqueues;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class ThreeStackArrayTest
{
  ThreeStackArray threeStackArray;
  @Before
  public void setUp() throws Exception
  {
    threeStackArray = new ThreeStackArray(100);
  }

  @Test
  public void push() throws Exception
  {
    threeStackArray.push(0, 1);
    threeStackArray.push(1, 2);
    threeStackArray.push(2, 3);
    assertEquals(1, threeStackArray.peek(0));
    assertEquals(2, threeStackArray.peek(1));
    assertEquals(3, threeStackArray.peek(2));
  }

  @Test
  public void pop() throws Exception
  {
    threeStackArray.push(0, 1);
    threeStackArray.push(1, 2);
    threeStackArray.push(2, 3);
    threeStackArray.pop(0);
    threeStackArray.pop(1);
    threeStackArray.pop(2);
    assertTrue(threeStackArray.empty(0));
    assertTrue(threeStackArray.empty(1));
    assertTrue(threeStackArray.empty(2));
  }
}