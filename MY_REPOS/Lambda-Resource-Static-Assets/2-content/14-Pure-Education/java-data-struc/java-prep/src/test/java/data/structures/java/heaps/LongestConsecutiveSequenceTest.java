package data.structures.java.heaps;

import org.junit.Test;

import static org.junit.Assert.*;

public class LongestConsecutiveSequenceTest
{

  @Test
  public void longestConsecutiveSequence()
  {
    // {100, 4, 20, 2, 1, 3, 21, 19} -> {1, 2, 3, 4}
    assertEquals(4, LongestConsecutiveSequence.longestConsecutiveSequence(new int[] {100, 4, 20, 2, 1, 3, 21, 19}));
  }
}