package data.structures.java.bits;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class BitSetTest
{
  BitSet bs;
  @Before
  public void setUp() throws Exception
  {
    bs = new BitSet(500);
    bs.set(499);
    bs.set(498);
    bs.set(497);
  }

  @Test
  public void get()
  {
    assertTrue(bs.get(499));
    assertTrue(bs.get(498));
    assertTrue(bs.get(497));
    assertFalse(bs.get(496));
    assertFalse(bs.get(0));
  }
}