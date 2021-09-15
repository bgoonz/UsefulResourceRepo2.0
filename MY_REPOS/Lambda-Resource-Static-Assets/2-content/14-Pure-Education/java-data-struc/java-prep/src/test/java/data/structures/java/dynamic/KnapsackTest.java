package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class KnapsackTest
{

  @Test
  public void knapsack()
  {
    int V[] = new int[]{10, 20, 30};
    int W[] = new int[]{1, 1, 1};
    int  C = 2;
    assertEquals(50, Knapsack.knapsack(C, W, V));

    V = new int[] {60, 100, 120};
    W = new int[] {10, 20, 30};
    C = 50;
    assertEquals(220, Knapsack.knapsack(C, W, V));
  }

  @Test
  public void knapsackUnsorted()
  {
    int V[] = new int[]{40, 20, 50, 10, 70};
    int W[] = new int[]{4, 3, 5, 1, 7};
    int  C = 11;
    assertEquals(110, Knapsack.knapsack(C, W, V));
  }


  @Test
  public void knapsackRecursive()
  {
    int V[] = new int[]{10, 20, 30};
    int W[] = new int[]{1, 1, 1};
    int  C = 2;
    assertEquals(50, Knapsack.knapsackRecursive(C, W, V));
  }

  @Test
  public void elevator()
  {
    int capacity = 750;
    int [] weights = {150, 200, 350, 420, 780};
    assertEquals(700, Knapsack.elevator(capacity, weights));
  }
}