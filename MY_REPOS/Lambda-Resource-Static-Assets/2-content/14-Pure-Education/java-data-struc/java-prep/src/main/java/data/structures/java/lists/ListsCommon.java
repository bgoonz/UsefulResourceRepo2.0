package data.structures.java.lists;

import java.util.Stack;

public class ListsCommon
{
  public static ListNode<Integer> mergeSorted(ListNode<Integer> n1, ListNode<Integer> n2)
  {
    List<Integer> result = new List<>();
    while (n1 != null && n2 != null) {
      ListNode<Integer> listNode = null;
      if (n1.data < n2.data)
      {
        listNode = new ListNode<>(n1.data);
        n1 = n1.next;
      }
      else
      {
        listNode = new ListNode<>(n2.data);
        n2 = n2.next;
      }

      result.add(listNode);
    }

    if (n1 != null) result.add(n1);
    if (n2 != null) result.add(n2);

    return result.head;
  }

  public static<T> ListNode<T> reverse(ListNode<T> head)
  {
    ListNode<T> prev = null;
    while(head != null)
    {
      ListNode<T> tmp = head.next;
      head.next = prev;
      prev = head;
      head = tmp;
    }
    return prev;
  }

  public static<T> void deleteDups(ListNode<T> head)
  {
    while(head != null)
    {
      ListNode<T> runner = head;
      while(runner.next != null)
      {
        if(head.data == runner.next.data)
        {
          runner.next = runner.next.next;
        }
        else
        {
          runner = runner.next;
        }
      }
      head = head.next;
    }
  }

  public static<T> void deleteEveryOther(ListNode<T> head)
  {
    while(head != null && head.next != null)
    {
      head.next = head.next.next;
      head = head.next;
    }
  }

  public static<T> ListNode<T> findMiddle(ListNode<T> head)
  {
    if(head == null || head.next == null)
    {
      return head;
    }

    ListNode<T> slow = head, fast = head;
    while(fast != null && fast.next != null)
    {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
  }

  public static<T> ListNode<T> startOfLoop(ListNode<T> head)
  {
    if(head == null || head.next == null)
    {
      return null;
    }

    ListNode<T> slow = head, fast = head;

    boolean loopExists = false;
    while(fast != null && fast.next != null)
    {
      slow = slow.next;
      fast = fast.next.next;
      if(slow == fast)
      {
        loopExists = true;
        break;
      }
    }

    if(!loopExists)
    {
      return null;
    }

    fast = head;
    while(fast != slow)
    {
      fast = fast.next;
      slow = slow.next;
    }
    return slow;
  }

  private static int listToNumber(ListNode<Integer> head)
  {
    int number = 0;
    while(head != null)
    {
      number = number * 10 + head.data;
      head = head.next;
    }
    return number;
  }

  static<T> int addNumbersLists(ListNode<T> n1, ListNode<T> n2)
  {
    return listToNumber((ListNode<Integer>)n1) + listToNumber((ListNode<Integer>)n2);
  }

  public static ListNode<Integer> addNumbersFromReversedLists(ListNode<Integer> n1, ListNode<Integer> n2)
  {
    List<Integer> list = new List<>();

    int carry = 0;
    while(n1 != null && n2 != null)
    {
      int total = n1.data + n2.data + carry;
      int val = total % 10;
      carry = total / 10;
      list.add(new ListNode<>(val));
      n1 = n1.next;
      n2 = n2.next;
    }

    ListNode<Integer> n = n1 != null ? n1 : n2;

    while(n != null)
    {
      int total = n.data + carry;
      int val = total % 10;
      carry = total / 10;
      list.add(new ListNode<>(val));
      n = n.next;
    }
    if(carry > 0)
    {
      list.add(new ListNode<>(carry));
    }

    return list.head;
  }

  public static<T> boolean isPalindrome(ListNode<T> head)
  {
    Stack<T> stack = new Stack();
    ListNode<T> slow = head, fast = head;
    while(fast != null && fast.next != null)
    {
      stack.push(slow.data);
      slow = slow.next;
      fast = fast.next.next;
    }

    if(fast != null)
    {
      slow = slow.next;
    }

    while(slow != null)
    {
      if(slow.data != stack.pop())
      {
        return false;
      }
      slow = slow.next;
    }
    return true;
  }

  public static int minInCircular(ListNode<Integer> head)
  {
    int min = head.data;
    ListNode<Integer> start = head.next;
    while(start != head)
    {
      min = Math.min(min, start.data);
      start = start.next;
    }
    return min;
  }

  public static<T> void flatten(DownNode<T> head)
  {
    while(head != null)
    {
      DownNode<T> down = head.down;
      if(down != null)
      {
        DownNode<T> tmp = head.next;
        while(down.next != null)
        {
          down = down.next;
        }
        head.next = head.down;
        down.next = tmp;
      }
      head = head.next;
    }
  }

  public static<T> void pairwiseSwap(ListNode<T> head)
  {
    ListNode<T> current = head;
    while(current != null && current.next != null)
    {
      ListNode<T> nextNode = current.next;
      T temp = nextNode.data;
      nextNode.data = current.data;
      current.data = temp;
      current = current.next.next;
    }
  }
}
