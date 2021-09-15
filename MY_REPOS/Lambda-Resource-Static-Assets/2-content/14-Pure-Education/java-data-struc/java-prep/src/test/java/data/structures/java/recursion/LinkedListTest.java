package data.structures.java.recursion;

import data.structures.java.lists.List;
import data.structures.java.lists.ListNode;
import org.junit.Test;

import static org.junit.Assert.*;

public class LinkedListTest
{

  @Test
  public void reverseList()
  {
    List<Integer> list = new List<>();
    list.add(new ListNode<>(1)).add(new ListNode<Integer>(2)).add(new ListNode<Integer>(3));

    ListNode<Integer> reversed = LinkedList.reverseList(list.head);
    assertEquals(Integer.valueOf(3), reversed.data);
    assertEquals(Integer.valueOf(2), reversed.next.data);
    assertEquals(Integer.valueOf(1), reversed.next.next.data);
  }

  @Test
  public void nthToLast()
  {
    List<Integer> list = new List<>();
    list.add(new ListNode<>(1)).add(new ListNode<>(2))
        .add(new ListNode<>(3)).add(new ListNode<>(4))
        .add(new ListNode<>(5));

    ListNode<Integer> result = LinkedList.nthToLast(list.head, 3);
    assertEquals(Integer.valueOf(3), result.data);
  }
}