package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class EggDropTest
{

  @Test
  public void eggDrop()
  {
    assertEquals(4, EggDrop.drop(10, 2));
    //assertEquals(14, EggDrop.drop(100, 2));
  }

  @Test
  public void dropDynamic()
  {
    assertEquals(4, EggDrop.dropDynamic(10, 2));
    assertEquals(14, EggDrop.dropDynamic(100, 2));
  }

  @Test
  public void dropNumeric()
  {
    assertEquals(14, EggDrop.dropNumeric(105));
  }
}