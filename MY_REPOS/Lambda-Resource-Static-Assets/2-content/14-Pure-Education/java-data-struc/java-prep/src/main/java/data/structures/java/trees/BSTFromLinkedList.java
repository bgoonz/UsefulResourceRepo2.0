package data.structures.java.trees;

import data.structures.java.lists.ListNode;

import static data.structures.java.lists.ListNode.getLength;

public class BSTFromLinkedList<T>
{
  //  Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST
  private ListNode<T> head;
  public BSTFromLinkedList(ListNode<T> head)
  {
    this.head = head;
  }

  public TreeNode<T> convert()
  {
    if(head == null)
    {
      return null;
    }
    return convert(0, getLength(head));
  }

  private TreeNode<T> convert(int start, int end)
  {
    if(end <= start)
    {
      return null;
    }

    int mid = (start + end) / 2;
    TreeNode<T> left = convert(start, mid - 1);
    TreeNode<T> root = new TreeNode<>(head.data);
    root.left = left;
    head = head.next;
    root.right = convert(mid + 1, end);
    return root;
  }

}
