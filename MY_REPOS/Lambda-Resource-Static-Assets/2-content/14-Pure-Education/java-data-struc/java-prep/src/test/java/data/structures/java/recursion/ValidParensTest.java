package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class ValidParensTest
{

  @Test
  public void generateValidParens()
  {
    java.util.List<String> result = ValidParens.generateValidParens(3);
    assertEquals(5, result.size());
    assertEquals("((()))", result.get(0));
    assertEquals("(()())", result.get(1));
    assertEquals("(())()", result.get(2));
    assertEquals("()(())", result.get(3));
    assertEquals("()()()", result.get(4));
  }
}