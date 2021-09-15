package data.structures.java.stacksqueues;

import org.junit.Test;

import java.util.Stack;

import static org.junit.Assert.*;

public class StackUtilitiesTest
{

  @Test
  public void balancedParens()
  {
    String balanced = "This<text[is](balanced){(<[]>)}>";
    String notBalanced = "This<text[is not](balanced){(<[>)}>";

    assertTrue(StackUtilities.balancedParens(balanced));
    assertFalse(StackUtilities.balancedParens(notBalanced));
  }

  @Test
  public void sortAscending()
  {
    Stack<Integer> stack = new Stack<>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);

    Stack<Integer> sorted = StackUtilities.sortAscending(stack);
    assertEquals(Integer.valueOf(1), sorted.pop());
    assertEquals(Integer.valueOf(2), sorted.pop());
    assertEquals(Integer.valueOf(3), sorted.pop());
    assertEquals(Integer.valueOf(4), sorted.pop());
    assertEquals(Integer.valueOf(5), sorted.pop());
    assertTrue(sorted.empty());
  }

  @Test
  public void productOfDigits()
  {
    assertEquals(455, StackUtilities.productOfDigits(100));
  }
}