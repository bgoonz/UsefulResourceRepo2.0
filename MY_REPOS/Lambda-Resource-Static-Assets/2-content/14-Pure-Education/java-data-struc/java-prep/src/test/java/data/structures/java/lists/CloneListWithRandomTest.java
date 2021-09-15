package data.structures.java.lists;

import org.junit.Test;

import static org.junit.Assert.*;

public class CloneListWithRandomTest
{

  @Test
  public void cloneRandomList()
  {
    RandomNode<Integer> rn1 = new RandomNode<>(1);
    RandomNode<Integer> rn2 = new RandomNode<>(2);
    RandomNode<Integer> rn3 = new RandomNode<>(3);
    RandomNode<Integer> rn4 = new RandomNode<>(4);
    RandomNode<Integer> rn5 = new RandomNode<>(5);

    rn1.next = rn2;
    rn2.next = rn3;
    rn3.next = rn4;
    rn4.next = rn5;

    rn1.random = rn3;
    rn2.random = rn4;

    RandomNode<Integer> copy = CloneListWithRandom.cloneRandomList(rn1);
    assertEquals(Integer.valueOf(1), copy.data);
    assertEquals(Integer.valueOf(2), copy.next.data);
    assertEquals(Integer.valueOf(3), copy.next.next.data);
    assertEquals(Integer.valueOf(4), copy.next.next.next.data);
    assertEquals(Integer.valueOf(5), copy.next.next.next.next.data);

    assertEquals(Integer.valueOf(3), copy.random.data);
    assertEquals(Integer.valueOf(4), copy.next.random.data);
  }
}