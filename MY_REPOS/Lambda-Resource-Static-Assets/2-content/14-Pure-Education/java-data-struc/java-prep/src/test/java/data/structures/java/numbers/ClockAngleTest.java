package data.structures.java.numbers;

import org.junit.Test;

import static org.junit.Assert.*;

public class ClockAngleTest
{

  @Test
  public void angle()
  {
    assertEquals(90, ClockAngle.angle(3, 0));
  }
}