package data.structures.java.lists;

public class List<T>
{
  public ListNode<T> head;
  public ListNode<T> tail;

  public List<T> add(ListNode<T> listNode)
  {
    if(head == null)
    {
      head = tail = listNode;
    }
    else
    {
      if(listNode.next == null)
      {
        tail.next = listNode;
        tail = listNode;
      }
      else
      {
        while(listNode.next != null)
        {
          listNode = listNode.next;
        }
        tail.next = listNode;
        tail = listNode;
      }
    }
    return this;
  }
}
