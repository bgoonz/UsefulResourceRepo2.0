package data.structures.java.lists;

import org.junit.Test;

import static org.junit.Assert.*;

public class DoubleListTest
{

  @Test
  public void append()
  {
    DoubleNode<Integer> n1 = new DoubleNode<>(1);
    DoubleNode<Integer> n2 = new DoubleNode<>(2);
    DoubleNode<Integer> n3 = new DoubleNode<>(3);

    assertEquals(Integer.valueOf(1), n1.data);
    assertEquals(Integer.valueOf(2), n2.data);
    assertEquals(Integer.valueOf(3), n3.data);

    DoubleList<Integer> doubleList = new DoubleList<>();
    doubleList.append(n1);
    doubleList.append(n2);
    doubleList.append(n3);

    assertTrue(doubleList.head == n1);
    assertTrue(doubleList.tail == n3);

    assertTrue(n1.prev == null);
    assertTrue(n1.next == n2);
    assertTrue(n2.next == n3);
    assertTrue(n3.next == null);

    assertTrue(n2.prev == n1);
    assertTrue(n3.prev == n2);
  }

  @Test
  public void prepend()
  {
    DoubleNode<Integer> n1 = new DoubleNode<>(1);
    DoubleNode<Integer> n2 = new DoubleNode<>(2);
    DoubleNode<Integer> n3 = new DoubleNode<>(3);

    assertEquals(Integer.valueOf(1), n1.data);
    assertEquals(Integer.valueOf(2), n2.data);
    assertEquals(Integer.valueOf(3), n3.data);

    DoubleList<Integer> doubleList = new DoubleList<>();
    doubleList.prepend(n1);
    doubleList.prepend(n2);
    doubleList.prepend(n3);

    assertTrue(doubleList.head == n3);
    assertTrue(doubleList.tail == n1);

    assertTrue(n3.prev == null);
    assertTrue(n3.next == n2);
    assertTrue(n2.next == n1);
    assertTrue(n1.next == null);

    assertTrue(n2.prev == n3);
    assertTrue(n1.prev == n2);
  }

  @Test
  public void insertBefore()
  {
    DoubleNode<Integer> n1 = new DoubleNode<>(1);
    DoubleNode<Integer> n2 = new DoubleNode<>(2);
    DoubleNode<Integer> n3 = new DoubleNode<>(3);

    assertEquals(Integer.valueOf(1), n1.data);
    assertEquals(Integer.valueOf(2), n2.data);
    assertEquals(Integer.valueOf(3), n3.data);

    DoubleList<Integer> doubleList = new DoubleList<>();
    doubleList.append(n1);
    doubleList.append(n2);
    doubleList.append(n3);

    DoubleNode<Integer> n4 = new DoubleNode<>(4);
    doubleList.insertBefore(n2, n4);

    assertTrue(n1.next == n4);
    assertTrue(n4.prev == n1);
    assertTrue(n4.next == n2);

  }

  @Test
  public void insertAfter()
  {
    DoubleNode<Integer> n1 = new DoubleNode<>(1);
    DoubleNode<Integer> n2 = new DoubleNode<>(2);
    DoubleNode<Integer> n3 = new DoubleNode<>(3);

    assertEquals(Integer.valueOf(1), n1.data);
    assertEquals(Integer.valueOf(2), n2.data);
    assertEquals(Integer.valueOf(3), n3.data);

    DoubleList<Integer> doubleList = new DoubleList<>();
    doubleList.append(n1);
    doubleList.append(n2);
    doubleList.append(n3);

    DoubleNode<Integer> n4 = new DoubleNode<>(4);
    doubleList.insertAfter(n2, n4);

    assertTrue(n2.next == n4);
    assertTrue(n4.prev == n2);
    assertTrue(n4.next == n3);
  }
}