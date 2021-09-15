package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class PerfectSquaresTest
{

  @Test
  public void perfectSquares()
  {
    assertEquals(3, PerfectSquares.leastNumberOfPerfectSquares(12));
    assertEquals(2, PerfectSquares.leastNumberOfPerfectSquares(13));
  }
}