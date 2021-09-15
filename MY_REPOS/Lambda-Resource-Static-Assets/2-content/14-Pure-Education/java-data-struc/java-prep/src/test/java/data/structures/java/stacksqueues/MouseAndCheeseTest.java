package data.structures.java.stacksqueues;

import data.structures.java.stacksqueues.MouseAndCheese;
import org.junit.Test;

import static org.junit.Assert.*;

public class MouseAndCheeseTest
{

  @Test
  public void solve()
  {
    int maze[][] = {
        {1, 0, 1, 1, 1, 1, 1, 1, 1, 1 },
        {1, 0, 1, 0, 1, 1, 1, 0, 1, 1 },
        {1, 1, 1, 0, 1, 1, 0, 1, 1, 1 },
        {0, 0, 0, 0, 9, 0, 0, 1, 0, 1 },
        {1, 1, 1, 0, 1, 1, 1, 1, 1, 0 },
        {1, 0, 1, 1, 1, 1, 0, 1, 0, 0 },
        {1, 0, 0, 0, 0, 0, 0, 0, 0, 1 },
        {1, 0, 1, 1, 1, 1, 0, 1, 1, 1 },
        {1, 1, 1, 0, 0, 1, 1, 1, 0, 1 }};

    MouseAndCheese mouseAndCheese = new MouseAndCheese(maze, new int[] {0, 0});
    assertEquals(11, mouseAndCheese.distance());

    mouseAndCheese = new MouseAndCheese(maze, new int[] {8, 9});
    assertEquals(24, mouseAndCheese.distance());
  }
}