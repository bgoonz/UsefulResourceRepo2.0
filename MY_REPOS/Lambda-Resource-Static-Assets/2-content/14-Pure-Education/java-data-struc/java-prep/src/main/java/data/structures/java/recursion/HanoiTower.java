package data.structures.java.recursion;

import java.util.Stack;

public class HanoiTower
{
  protected Stack<Integer> disks = new Stack<>();

  private void moveTo(HanoiTower dest)
  {
    dest.disks.push(disks.pop());
  }

  private void moveDisks(int n, HanoiTower dest, HanoiTower buffer)
  {
    if(n > 0)
    {
      moveDisks(n - 1, buffer, dest);
      moveTo(dest);
      buffer.moveDisks(n - 1, dest, this);
    }
  }

  public static HanoiTower[] initialize()
  {
    HanoiTower[] towers = new HanoiTower[3];
    for(int i = 0; i < 3; ++i)
    {
      towers[i] = new HanoiTower();
    }
    for(int i = 2; i >= 0; --i)
    {
      towers[0].disks.push(i);
    }
    return towers;
  }

  public static void play(HanoiTower[] towers)
  {
    towers[0].moveDisks(3, towers[1], towers[2]);
  }
}
