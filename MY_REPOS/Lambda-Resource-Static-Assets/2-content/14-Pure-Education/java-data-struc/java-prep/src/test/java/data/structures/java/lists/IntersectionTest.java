package data.structures.java.lists;

import org.junit.Test;

import static org.junit.Assert.*;

public class IntersectionTest
{

  @Test
  public void testIntersection()
  {
    ListNode<Integer> n1 = new ListNode<>(1);
    ListNode<Integer> n2 = new ListNode<>(2);
    ListNode<Integer> n3 = new ListNode<>(3);
    ListNode<Integer> n4 = new ListNode<>(4);
    ListNode<Integer> n5 = new ListNode<>(5);
    ListNode<Integer> n6 = new ListNode<>(6);
    ListNode<Integer> n7 = new ListNode<>(7);

    n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n5;
    n6.next = n7; n7.next = n4;

    assertEquals(Integer.valueOf(4), new Intersection<>(n1, n6).getIntersection().data);
  }

  @Test
  public void listsIntersect()
  {
    ListNode<Integer> n1 = new ListNode<>(1);
    ListNode<Integer> n2 = new ListNode<>(2);
    ListNode<Integer> n3 = new ListNode<>(3);
    ListNode<Integer> n4 = new ListNode<>(4);
    ListNode<Integer> n5 = new ListNode<>(5);
    ListNode<Integer> n6 = new ListNode<>(6);
    ListNode<Integer> n7 = new ListNode<>(7);

    n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n5;
    n6.next = n7; n7.next = n4;

    assertTrue(new Intersection<>(n1, n6).listsIntersect());
  }
}