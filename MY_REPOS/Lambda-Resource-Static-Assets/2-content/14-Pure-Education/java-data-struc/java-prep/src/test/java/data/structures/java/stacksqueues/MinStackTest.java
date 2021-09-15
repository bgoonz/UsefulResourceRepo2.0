package data.structures.java.stacksqueues;

import org.junit.Test;

import static org.junit.Assert.*;

public class MinStackTest
{

  @Test
  public void test()
  {
    MinStack minStack = new MinStack();
    minStack.push(2);
    minStack.push(5);
    minStack.push(3);
    assertEquals(2, minStack.min());
    minStack.push(1);
    assertEquals(1, minStack.min());
    minStack.pop();
    assertEquals(2, minStack.min());
    minStack.pop();
    assertEquals(2, minStack.min());
  }
}