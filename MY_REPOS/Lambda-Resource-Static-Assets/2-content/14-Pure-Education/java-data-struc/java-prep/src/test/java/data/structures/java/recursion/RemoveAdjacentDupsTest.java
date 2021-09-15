package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class RemoveAdjacentDupsTest
{
  @Test
  public void removeAdjacentDups()
  {
    assertEquals("abcb", RemoveAdjacentDups.removeAdjacentDups("aaabbbbcccb"));
  }

  @Test
  public void removeAdjacentDupsIterative()
  {
    assertEquals("abcb", RemoveAdjacentDups.removeAdjacentDupsIterative("aaabbbbcccb"));
    assertEquals("a", RemoveAdjacentDups.removeAdjacentDupsIterative("aa"));
    assertEquals("a", RemoveAdjacentDups.removeAdjacentDupsIterative("a"));
  }
}