package data.structures.java.lists;

public class Intersection<T>
{
  private ListNode<T> n1;
  private ListNode<T> n2;

  public Intersection(ListNode<T> n1, ListNode<T> n2)
  {
    this.n1 = n1;
    this.n2 = n2;
  }

  public ListNode<T> getIntersection()
  {
    int len1 = length(n1), len2 = length(n2);

    if(len1 > len2)
    {
      int diff = len1 - len2;
      for(int i = 0; i < diff; ++i)
      {
        n1 = n1.next;
      }
    }
    if(len2 > len1)
    {
      int diff = len2 - len1;
      for(int i = 0; i < diff; ++i)
      {
        n2 = n2.next;
      }
    }

    while(n1 != null)
    {
      if(n1 == n2)
      {
        return n1;
      }
      n1 = n1.next;
      n2 = n2.next;
    }
    return null;
  }

  private static<T> int length(ListNode<T> head)
  {
    int count = 0;
    while(head != null)
    {
      count++;
      head = head.next;
    }
    return count;
  }

  public boolean listsIntersect()
  {
    ListNode<T> last1 = getLast(n1);
    ListNode<T> last2 = getLast(n2);
    return last1 == last2;
  }

  private ListNode<T> getLast(ListNode<T> node)
  {
    ListNode<T> current = node;
    while(current.next != null)
    {
      current = current.next;
    }
    return current;
  }

}
