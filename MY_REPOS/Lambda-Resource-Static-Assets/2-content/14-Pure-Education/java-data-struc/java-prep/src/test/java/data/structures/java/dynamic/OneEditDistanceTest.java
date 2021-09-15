package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class OneEditDistanceTest
{

  @Test
  public void isEditDistance()
  {
    assertTrue(OneEditDistance.isOneEditDistance("book", "books"));
    assertTrue(OneEditDistance.isOneEditDistance("book", "cook"));
    assertTrue(OneEditDistance.isOneEditDistance("fact", "fat"));
    assertFalse(OneEditDistance.isOneEditDistance("books", "look"));
    assertFalse(OneEditDistance.isOneEditDistance("aaa", "aaaaaaaaa"));
  }
}