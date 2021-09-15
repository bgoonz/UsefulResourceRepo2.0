package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class DecodeWaysTest
{

  @Test
  public void numberOfWays()
  {
    String test = "2122";
    DecodeWays dw = new DecodeWays(test);
    assertEquals(5, dw.numberOfWays());
  }
}