package data.structures.java.recursion;

import data.structures.java.lists.ListNode;

public class LinkedList
{
  public static<T> ListNode<T> reverseList(ListNode<T> head)
  {
    if(head == null || head.next == null)
    {
      return head;
    }

    ListNode<T> second = head.next;
    ListNode<T> result = reverseList(second);
    head.next = null;
    second.next = head;
    return result;
  }

  // ========================================================================
  // ========================================================================
  // ========================================================================
  public static ListNode nthToLast(ListNode head, int k)
  {
    return nthToLast(head, k, new IntWrapper());
  }

  private static class IntWrapper {int value = 0;}

  private static ListNode nthToLast(ListNode head, int k, IntWrapper i)
  {
    if(head == null)
    {
      return null;
    }

    ListNode priorListNode = nthToLast(head.next, k, i);
    i.value++;
    if(i.value == k)
    {
      return head;
    }
    return priorListNode;
  }
}
