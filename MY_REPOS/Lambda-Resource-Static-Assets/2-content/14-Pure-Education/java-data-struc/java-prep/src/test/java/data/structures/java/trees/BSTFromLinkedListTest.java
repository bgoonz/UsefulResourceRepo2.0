package data.structures.java.trees;

import data.structures.java.lists.List;
import data.structures.java.lists.ListNode;
import org.junit.Test;

import static org.junit.Assert.*;

public class BSTFromLinkedListTest
{

  @Test
  public void convert()
  {
    List<Integer> sortedList = new List<>();
    sortedList.add(new ListNode<>(1)).add(new ListNode<>(2)).add(new ListNode<>(3))
        .add(new ListNode<>(4)).add(new ListNode<>(5)).add(new ListNode<>(6)).add(new ListNode<>(7));

    BSTFromLinkedList<Integer> bstFromLinkedList = new BSTFromLinkedList<Integer>(sortedList.head);

    TreeNode<Integer> treeNode = bstFromLinkedList.convert();
    assertTrue(BST.isBST1(treeNode));
  }
}