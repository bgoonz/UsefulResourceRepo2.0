package problems.java.recursion;

import problems.java.lists.List;

import java.util.Arrays;
import java.util.concurrent.atomic.AtomicInteger;

import static org.apache.commons.lang3.ArrayUtils.remove;
import static org.apache.commons.lang3.ArrayUtils.toArray;

public class LinkedList
{
    static<T extends Comparable<T>> List.Node<T> reverse(List.Node<T> head)
    {
        if(head == null || head.next == null)
        {
            return head;
        }

        List.Node<T> second = head.next;
        List.Node<T> result = reverse(second);
        head.next = null;
        second.next = head;
        return result;
    }

    static<T extends Comparable<T>> List.Node<T> nthToLast(List.Node<T> head, int k)
    {
        return nthToLast(head, k, new AtomicInteger(0));
    }

    private static<T extends Comparable<T>> List.Node<T> nthToLast(List.Node<T> head, int k, AtomicInteger ai)
    {
        if(head == null)
        {
            return null;
        }
        List.Node<T> priorNode = nthToLast(head.next, k, ai);
        if(ai.incrementAndGet() == k)
        {
            return head;
        }
        return priorNode;
    }

    static boolean testsPass()
    {
        List<Integer> list = new List<>();
        list.add(1, 2, 3, 4, 5);
        List.Node<Integer> reversed = reverse(list.head);

        boolean check = reversed.data == 5 && reversed.next.data == 4 &&
                reversed.next.next.data == 3 && reversed.next.next.next.data == 2 &&
                reversed.next.next.next.next.data == 1;

        if(!check)
        {
            return false;
        }
        list = new List<>();
        list.add(1, 2, 3, 4, 5, 6, 7);
        List.Node<Integer> n = nthToLast(list.head, 2);
        check = n.data == 6;
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
