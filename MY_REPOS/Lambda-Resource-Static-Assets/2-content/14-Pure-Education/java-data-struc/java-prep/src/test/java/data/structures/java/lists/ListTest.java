package data.structures.java.lists;

import org.junit.Test;

import static org.junit.Assert.*;

public class ListTest
{

  @Test
  public void createLinkedList()
  {
    ListNode<Integer> n1 = new ListNode<>(1);
    ListNode<Integer> n2 = new ListNode<>(2);
    ListNode<Integer> n3 = new ListNode<>(3);

    List<Integer> list = new List<>();
    list.add(n1).add(n2).add(n3);

    assertEquals(list.head.data, n1.data);
    assertEquals(list.tail.data, n3.data);
    assertEquals(n1.next.data, n2.data);
    assertEquals(n2.next.data, n3.data);
  }
}