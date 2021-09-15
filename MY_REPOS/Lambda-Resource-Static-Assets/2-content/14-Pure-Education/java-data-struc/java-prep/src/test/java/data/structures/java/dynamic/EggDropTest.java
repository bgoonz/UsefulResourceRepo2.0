package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class EggDropTest
{

  @Test
  public void drop()
  {
    assertEquals(4, EggDrop.drop(10, 2));
    assertEquals(14, EggDrop.drop(100, 2));
    assertEquals(45, EggDrop.drop(1000, 2));
  }

  @Test
  public void dropRecursive()
  {
    assertEquals(4, EggDrop.dropRecursive(10, 2));
    //assertEquals(14, EggDrop.dropRecursive(100, 2));
  }

  @Test
  public void dropNumeric()
  {
    assertEquals(14, data.structures.java.numbers.EggDrop.drop(105));
  }
}