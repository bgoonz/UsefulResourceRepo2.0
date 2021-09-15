package data.structures.java.lists;

public class ListNode<T>
{
  public T data;
  public ListNode<T> next;

  public ListNode(T data)
  {
    this.data = data;
  }

  public static<T> int getLength(ListNode<T> head)
  {
    int len = 0;
    ListNode<T> current = head;
    while(current != null)
    {
      len++;
      current = current.next;
    }
    return len;
  }
}
