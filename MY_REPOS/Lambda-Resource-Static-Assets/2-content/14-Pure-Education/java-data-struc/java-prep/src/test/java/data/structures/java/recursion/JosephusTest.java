package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class JosephusTest
{

  @Test
  public void josephus()
  {
    assertEquals(3, Josephus.josephus(5, 2));
  }
}