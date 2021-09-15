package problems.java.lists;

import java.lang.reflect.Array;

public class List<T>
{
    public static class Node<T>
    {
        public T data;
        public Node<T> next;
        public Node(T data)
        {
            this.data = data;
        }
    }

    public Node<T> head;
    public Node<T> tail;

    public void add(T... data)
    {
        for(T t : data)
        {
            add(t);
        }
    }

    public List<T> add(T data)
    {
        return add(new Node<T>(data));
    }

    public List<T> add(Node<T> node)
    {
        if(head == null)
        {
            head = tail = node;
        }
        else
        {
            if(node.next == null)
            {
                tail.next = node;
                tail = node;
            }
            else
            {
                Node<T> last = node;
                while(last.next != null)
                {
                    last = last.next;
                }
                tail.next = node;
                tail = last;
            }
        }

        return this;
    }


    public static<T extends Comparable<T>> Node<T>[] toArray(Node<T> head)
    {
        int len = length(head);
        Node<T>[] result = (Node<T>[])Array.newInstance(head.getClass(), len);

        Node<T> current = head;
        int idx = 0;
        while(current != null)
        {
            result[idx++] = current;
            current = current.next;
        }
        return result;
    }

    Node<T>[] toArray(Class<?> type, int size)
    {
        Node<T>[] a = (Node<T>[]) Array.newInstance(type, size);
        Node<T> current = head;
        int idx = 0;
        while(current != null)
        {
            a[idx++] = current;
            current = current.next;
        }
        return a;
    }

    public  static<T> int length(Node<T> node)
    {
        int len = 0;
        Node<T> current = node;
        while(current != null)
        {
            len++;
            current = current.next;
        }
        return len;
    }

    public int length()
    {
        return length(head);
    }

    static boolean testsPass()
    {
        Node<Integer> n1 = new Node<>(1);
        Node<Integer> n2 = new Node<>(2);
        Node<Integer> n3 = new Node<>(3);
        List<Integer> list1 = new List<>();
        list1.add(n1).add(n2).add(n3);
        boolean check = list1.head.data == n1.data;
        if(!check)
        {
            return false;
        }
        check = list1.tail.data == n3.data;
        if(!check)
        {
            return false;
        }
        check = list1.head.next.data == n2.data;
        if(!check)
        {
            return false;
        }
        Node<Integer> n4 = new Node<>(4);
        Node<Integer> n5 = new Node<>(5);
        Node<Integer> n6 = new Node<>(6);
        n5.next = n6;
        List<Integer> list2 = new List<>();
        list2.add(n4);
        check = list2.head.data == n4.data;
        if(!check)
        {
            return false;
        }
        check = list2.tail.data == n4.data;
        if(!check)
        {
            return false;
        }
        list2.add(n5);
        check = list2.head.next.data == n5.data;
        if(!check)
        {
            return false;
        }
        check = list2.tail.data == n6.data;
        if(!check)
        {
            return false;
        }
        check = n4.next.data == n5.data;
        if(!check)
        {
            return false;
        }
        check = list2.length() == 3;
        if(!check)
        {
            return false;
        }
        return true;
    }

    public static void main(String... args)
    {
        if(testsPass())
        {
            System.out.println("Tests passed");
        }
        else
        {
            System.out.println("Tests failed");
        }
    }

}
