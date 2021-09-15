package data.structures.java.numbers;

import org.junit.Test;

import static org.junit.Assert.*;

public class MinNumberFromSequenceTest
{

  @Test
  public void print()
  {
    assertEquals(21, MinNumberFromSequence.print("D"));
    assertEquals(12, MinNumberFromSequence.print("I"));
    assertEquals(321, MinNumberFromSequence.print("DD"));
    assertEquals(2143, MinNumberFromSequence.print("DID"));
    assertEquals(123, MinNumberFromSequence.print("II"));
    assertEquals(21435, MinNumberFromSequence.print("DIDI"));
    assertEquals(126543, MinNumberFromSequence.print("IIDDD"));
    assertEquals(321654798, MinNumberFromSequence.print("DDIDDIID"));
  }
}