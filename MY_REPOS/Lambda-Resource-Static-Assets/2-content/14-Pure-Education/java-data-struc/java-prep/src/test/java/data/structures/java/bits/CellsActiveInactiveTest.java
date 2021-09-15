package data.structures.java.bits;

import data.structures.java.bits.CellsActiveInactive;
import org.junit.Test;

import static org.junit.Assert.*;

public class CellsActiveInactiveTest
{

  @Test
  public void switchCells()
  {
    int[] a1 = {1, 0, 0, 0, 0, 1, 0, 0};
    int[] a2 = {1, 1, 1, 0, 1, 1, 1, 1};

    assertArrayEquals(new int [] {0, 1, 0, 0, 1, 0, 1, 0},
        CellsActiveInactive.switchCells(a1, 1));
    assertArrayEquals(new int [] {0, 0, 0, 0, 0, 1, 1, 0},
        CellsActiveInactive.switchCells(a2, 2));

  }
}