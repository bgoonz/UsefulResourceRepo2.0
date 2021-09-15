package problems.java.lists;

public class DoubleList<T>
{
    public static class DoubleNode<T>
    {
        public T data;
        public DoubleNode<T> next;
        public DoubleNode<T> prev;

        public DoubleNode(T data)
        {
            this.data = data;
        }
    }

    public DoubleNode<T> head;
    public DoubleNode<T> tail;

    public void append(DoubleNode<T> node)
    {
        if(head == null)
        {
            head = tail = node;
        }
        else
        {
            node.prev = tail;
            tail.next = node;
            tail = node;
        }
    }

    public void prepend(DoubleNode<T> node)
    {
        if(head == null)
        {
            head = tail = node;
        }
        else
        {
            node.next = head;
            head.prev = node;
            head = node;
        }
    }

    public void insertBefore(DoubleNode<T> before, DoubleNode<T> node)
    {
        if(head == null)
        {
            head = tail = node;
        }
        else
        {
            DoubleNode<T> runner = head;
            while(runner != before && runner != null)
            {
                runner = runner.next;
            }
            if(runner == null)
            {
                tail.next = node;
                tail = node;
            }
            else
            {
                before.prev.next = node;
                node.prev = before.prev;
                node.next = before;
                before.prev = node;
            }
        }
    }

    public void insertAfter(DoubleNode<T> after, DoubleNode<T> node)
    {
        if(head == null)
        {
            head = tail = node;
        }
        else
        {
            DoubleNode<T> runner = head;
            while(runner != after && runner != null)
            {
                runner = runner.next;
            }

            if(runner == null)
            {
                tail.next = node;
                tail = node;
            }
            else
            {
                after.next.prev = node;
                node.next = after.next;
                node.prev = after;
                after.next = node;
            }
        }
    }
}
