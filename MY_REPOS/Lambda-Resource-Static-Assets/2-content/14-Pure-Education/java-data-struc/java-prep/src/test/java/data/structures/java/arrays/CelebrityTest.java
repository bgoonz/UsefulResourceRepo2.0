package data.structures.java.arrays;

import org.junit.Test;

import static org.junit.Assert.*;

public class CelebrityTest
{

  @Test
  public void findCelebrity()
  {
    int[] data = {0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ,0};
    Celebrity c = new Celebrity(data);
    assertEquals(2, c.findCelebrity());
  }

  @Test
  public void findCelebrityStacks()
  {
    int [][] data = {
        { 0, 0, 1, 0 },
        { 0, 0, 1, 0 },
        { 0, 0, 0, 0 },
        { 0, 0, 1, 0 }
    };

    assertEquals(2, Celebrity.findCelebrityStacks(data));

  }
}