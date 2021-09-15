package data.structures.java.strings;

import org.junit.Test;

import static org.junit.Assert.*;

public class LongestCommonPrefixTest
{

  @Test
  public void longestCommonPrefix()
  {
    String[] data =
        {
            "flow",
            "flower",
            "florish",
            "floor"
        };

    assertEquals("flo", LongestCommonPrefix.longestCommonPrefix(data));
  }
}