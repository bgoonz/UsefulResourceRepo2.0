package data.structures.java.trees;

import org.junit.Test;

import static org.junit.Assert.*;

public class ReplaceWithNextGreatestTest
{

  @Test
  public void findInorderSuccessor()
  {
    int [] a = { 10, 100, 93, 32, 35, 65, 80, 90, 94, 6 };
    ReplaceWithNextGreatest.findInorderSuccessor(a);
    assertArrayEquals(new int[] {32, -1,  94, 35, 65, 80, 90, 94, -1, -1}, a);
  }
}