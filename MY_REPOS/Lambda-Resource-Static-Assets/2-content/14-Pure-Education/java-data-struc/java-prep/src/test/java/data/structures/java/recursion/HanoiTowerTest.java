package data.structures.java.recursion;

import data.structures.java.recursion.HanoiTower;
import org.junit.Test;

import static org.junit.Assert.*;

public class HanoiTowerTest
{

  @Test
  public void play()
  {
    HanoiTower[] towers = HanoiTower.initialize();
    assertEquals(3, towers[0].disks.size());
    HanoiTower.play(towers);
    assertEquals(0, towers[0].disks.size());
    assertEquals(3, towers[1].disks.size());
    assertEquals(0, towers[2].disks.size());
  }
}