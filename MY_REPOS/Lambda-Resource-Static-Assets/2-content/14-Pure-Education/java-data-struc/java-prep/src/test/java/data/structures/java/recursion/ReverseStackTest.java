package data.structures.java.recursion;

import org.junit.Test;

import java.util.Stack;

import static org.junit.Assert.*;

public class ReverseStackTest
{

  @Test
  public void reverseStack()
  {
    Stack<Integer> stack = new Stack<>();
    stack.push(1); stack.push(2); stack.push(3); stack.push(4); stack.push(5);
    ReverseStack.reverseStack(stack);
    assertEquals(Integer.valueOf(1), stack.pop());
    assertEquals(Integer.valueOf(2), stack.pop());
    assertEquals(Integer.valueOf(3), stack.pop());
    assertEquals(Integer.valueOf(4), stack.pop());
    assertEquals(Integer.valueOf(5), stack.pop());
  }
}