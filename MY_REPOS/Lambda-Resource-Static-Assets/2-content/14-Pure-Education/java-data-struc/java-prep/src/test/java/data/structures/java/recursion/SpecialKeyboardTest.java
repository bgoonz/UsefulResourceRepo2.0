package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class SpecialKeyboardTest
{

  @Test
  public void findOptimal()
  {
    assertEquals(20, SpecialKeyboard.findOptimal(10));
  }
}