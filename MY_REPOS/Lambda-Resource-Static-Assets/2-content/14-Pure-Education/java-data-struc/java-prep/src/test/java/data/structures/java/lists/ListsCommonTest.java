package data.structures.java.lists;

import org.junit.Test;

import static org.junit.Assert.*;

public class ListsCommonTest
{

  @Test
  public void mergeSorted()
  {
    List<Integer> list1 = new List<>();
    list1.add(new ListNode<>(1)).add(new ListNode<>(3)).add(new ListNode<>(5));
    List<Integer> list2 = new List<>();
    list2.add(new ListNode<>(2)).add(new ListNode<>(4));

    ListNode<Integer> result = ListsCommon.mergeSorted(list1.head, list2.head);
    assertEquals(Integer.valueOf(1), result.data);
    assertEquals(Integer.valueOf(2), result.next.data);
    assertEquals(Integer.valueOf(3), result.next.next.data);
    assertEquals(Integer.valueOf(4), result.next.next.next.data);
    assertEquals(Integer.valueOf(5), result.next.next.next.next.data);
  }

  @Test
  public void reverse()
  {
    List<Integer> list = new List<>();
    list.add(new ListNode<>(1)).add(new ListNode<>(2)).add(new ListNode<>(3));

    ListNode<Integer> reversed = ListsCommon.reverse(list.head);
    assertEquals(Integer.valueOf(3), reversed.data);
    assertEquals(Integer.valueOf(2), reversed.next.data);
    assertEquals(Integer.valueOf(1), reversed.next.next.data);
  }

  @Test
  public void deleteDups()
  {
    List<Integer> list = new List<>();
    list.add(new ListNode<>(1))
        .add(new ListNode<>(2))
        .add(new ListNode<>(3))
        .add(new ListNode<>(2))
        .add(new ListNode<>(1));

    ListsCommon.deleteDups(list.head);
    assertEquals(Integer.valueOf(1), list.head.data);
    assertEquals(Integer.valueOf(2), list.head.next.data);
    assertEquals(Integer.valueOf(3), list.head.next.next.data);
    assertNull(list.head.next.next.next);
  }

  @Test
  public void deleteEveryOther()
  {
    List<Integer> list = new List<>();
    list.add(new ListNode<>(1))
        .add(new ListNode<>(2))
        .add(new ListNode<>(3))
        .add(new ListNode<>(2))
        .add(new ListNode<>(1));

    ListsCommon.deleteEveryOther(list.head);
    assertEquals(Integer.valueOf(1), list.head.data);
    assertEquals(Integer.valueOf(3), list.head.next.data);
    assertEquals(Integer.valueOf(1), list.head.next.next.data);
    assertNull(list.head.next.next.next);
  }

  @Test
  public void findMiddle()
  {
    List<Integer> list = new List<>();
    list.add(new ListNode<>(1))
        .add(new ListNode<>(2))
        .add(new ListNode<>(3))
        .add(new ListNode<>(2))
        .add(new ListNode<>(1));

    ListNode<Integer> middle = ListsCommon.findMiddle(list.head);
    assertEquals(Integer.valueOf(3), middle.data);
  }

  @Test
  public void startOfLoop()
  {
    List<Integer> list = new List<>();
    ListNode<Integer> n1 = new ListNode<>(1);
    ListNode<Integer> n2 = new ListNode<>(2);
    ListNode<Integer> n3 = new ListNode<>(3);
    ListNode<Integer> n4 = new ListNode<>(4);
    ListNode<Integer> n5 = new ListNode<>(5);
    ListNode<Integer> n6 = new ListNode<>(6);
    ListNode<Integer> n7 = new ListNode<>(7);

    n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n5; n5.next = n6; n6.next = n7; n7.next = n3;

    ListNode<Integer> startOfLoop = ListsCommon.startOfLoop(n1);
    assertEquals(Integer.valueOf(3), startOfLoop.data);
  }

  @Test
  public void addNumberLists()
  {
    List<Integer> list1 = new List<>();
    list1.add(new ListNode<>(1))
        .add(new ListNode<>(2))
        .add(new ListNode<>(3));

    List<Integer> list2 = new List<>();
    list2.add(new ListNode<>(3))
        .add(new ListNode<>(2));

    assertEquals(155, ListsCommon.addNumbersLists(list1.head, list2.head));
  }

  @Test
  public void addNumbersFromReversedLists()
  {
    List<Integer> list1 = new List<>();
    list1.add(new ListNode<>(5))
        .add(new ListNode<>(4))
        .add(new ListNode<>(6));

    List<Integer> list2 = new List<>();
    list2.add(new ListNode<>(6))
        .add(new ListNode<>(7))
        .add(new ListNode<>(5))
        .add(new ListNode<>(3));

    ListNode<Integer> result = ListsCommon.addNumbersFromReversedLists(list1.head, list2.head);

    assertEquals(Integer.valueOf(1), result.data);
    assertEquals(Integer.valueOf(2), result.next.data);
    assertEquals(Integer.valueOf(2), result.next.next.data);
    assertEquals(Integer.valueOf(4), result.next.next.next.data);
    assertNull(result.next.next.next.next);
  }

  @Test
  public void isPalindrome()
  {
    List<Integer> list1 = new List<>();
    list1.add(new ListNode<>(1))
        .add(new ListNode<>(2))
        .add(new ListNode<>(2))
        .add(new ListNode<>(1));

    List<Integer> list2 = new List<>();
    list2.add(new ListNode<>(1))
        .add(new ListNode<>(2))
        .add(new ListNode<>(3))
        .add(new ListNode<>(2))
        .add(new ListNode<>(1));

    List<Integer> list3 = new List<>();
    list3.add(new ListNode<>(1))
        .add(new ListNode<>(2))
        .add(new ListNode<>(3))
        .add(new ListNode<>(4))
        .add(new ListNode<>(5));

    assertTrue(ListsCommon.isPalindrome(list1.head));
    assertTrue(ListsCommon.isPalindrome(list2.head));
    assertFalse(ListsCommon.isPalindrome(list3.head));
  }

  @Test
  public void minInCircular()
  {
    ListNode<Integer> n1 = new ListNode<>(6);
    ListNode<Integer> n2 = new ListNode<>(5);
    ListNode<Integer> n3 = new ListNode<>(1);
    ListNode<Integer> n4 = new ListNode<>(7);
    ListNode<Integer> n5 = new ListNode<>(4);
    ListNode<Integer> n6 = new ListNode<>(2);
    ListNode<Integer> n7 = new ListNode<>(3);
    n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n5; n5.next = n6; n6.next = n7; n7.next = n1;
    assertEquals(1, ListsCommon.minInCircular(n1));
  }

  @Test
  public void flatten()
  {
    DownNode<Integer> n1 = new DownNode<>(1);
    DownNode<Integer> n2 = new DownNode<>(11);
    DownNode<Integer> n3 = new DownNode<>(111);
    DownNode<Integer> n4 = new DownNode<>(2);
    DownNode<Integer> n5 = new DownNode<>(22);
    DownNode<Integer> n6 = new DownNode<>(222);

    n1.next = n2; n2.next = n3;
    n4.next = n5; n5.next = n6;
    n2.down = n4;

    ListsCommon.flatten(n1);
    assertEquals(Integer.valueOf(1), n1.data);
    assertEquals(Integer.valueOf(11), n1.next.data);
    assertEquals(Integer.valueOf(2), n1.next.next.data);
    assertEquals(Integer.valueOf(22), n1.next.next.next.data);
    assertEquals(Integer.valueOf(222), n1.next.next.next.next.data);
    assertEquals(Integer.valueOf(111), n1.next.next.next.next.next.data);
  }

  @Test
  public void pairwiseSwapEven()
  {
    List<Integer> list = new List<>();
    list.add(new ListNode<>(1))
        .add(new ListNode<>(2))
        .add(new ListNode<>(3))
        .add(new ListNode<>(4));

    ListsCommon.pairwiseSwap(list.head);
    assertEquals(Integer.valueOf(2), list.head.data);
    assertEquals(Integer.valueOf(1), list.head.next.data);
    assertEquals(Integer.valueOf(4), list.head.next.next.data);
    assertEquals(Integer.valueOf(3), list.head.next.next.next.data);
  }

  @Test
  public void pairwiseSwapOdd()
  {
    List<Integer> list = new List<>();
    list.add(new ListNode<>(1))
        .add(new ListNode<>(2))
        .add(new ListNode<>(3))
        .add(new ListNode<>(4))
        .add(new ListNode<>(5));

    ListsCommon.pairwiseSwap(list.head);
    assertEquals(Integer.valueOf(2), list.head.data);
    assertEquals(Integer.valueOf(1), list.head.next.data);
    assertEquals(Integer.valueOf(4), list.head.next.next.data);
    assertEquals(Integer.valueOf(3), list.head.next.next.next.data);
    assertEquals(Integer.valueOf(5), list.head.next.next.next.next.data);
  }

}