package data.structures.java.strings;

import org.junit.Test;

import static org.junit.Assert.*;

public class ReverseWordsTest
{

  @Test
  public void reverseWords()
  {
    ReverseWords rw = new ReverseWords("one two three");
    assertEquals("eno owt eerht", rw.reverseWords());
  }
}