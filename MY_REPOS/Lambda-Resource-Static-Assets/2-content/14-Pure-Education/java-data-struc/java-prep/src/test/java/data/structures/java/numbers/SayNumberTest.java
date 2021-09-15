package data.structures.java.numbers;

import org.junit.Test;

import static org.junit.Assert.*;

public class SayNumberTest
{

  @Test
  public void convert()
  {
    NumberToWords sn = new NumberToWords(3_456_768_233L);
    assertEquals("threebillionfourhundredfiftysixmillionsevenhundredsixtyeightthousandtwohundredthirtythree",
        sn.convert());
  }
}