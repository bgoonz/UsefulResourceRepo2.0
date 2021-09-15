package data.structures.java.strings;

import org.junit.Test;

import static org.junit.Assert.*;

public class CompressTest
{

  @Test
  public void compress()
  {
    Compress c = new Compress("aaabbbbbcdddd");
    assertEquals("a3b5c1d4", c.compress());
  }

  @Test
  public void decompress()
  {
    assertEquals("aaabbbbbbbbbbbbcc", Compress.decompress("a3b12c2"));
  }
}