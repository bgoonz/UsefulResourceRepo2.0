package data.structures.java.numbers;

import org.junit.Test;

import static org.junit.Assert.*;

public class EggDropTest
{

  @Test
  public void drop()
  {
    assertEquals(14, EggDrop.drop(105));
  }

  @Test
  public void dropRecursive()
  {
    assertEquals(4, EggDrop.dropRecursive(10));
  }

  @Test
  public void dropDynamic()
  {
    assertEquals(14, EggDrop.dropDynamic(105));
  }
}