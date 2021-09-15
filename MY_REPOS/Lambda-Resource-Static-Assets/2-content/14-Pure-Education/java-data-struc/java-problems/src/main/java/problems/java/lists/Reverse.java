package problems.java.lists;

import java.util.Arrays;

public class Reverse
{
    static<T> List.Node<T> reverse(List.Node<T> head)
    {
        if(head == null || head.next == null)
        {
            return head;
        }

        List.Node<T> current = head;
        List.Node<T> prev = null;
        while(current != null)
        {
            List.Node<T> temp = current.next;
            current.next = prev;
            prev = current;
            current = temp;
        }
        return prev;
    }

    //////////////////////////////////////////////////////////////////////////////////
    static void reverseEvenValueSublists(List.Node<Integer> head)
    {
        while(head != null)
        {
            List.Node<Integer> current = head;
            if(current.data % 2 == 0)
            {
                List.Node<Integer> runner = current.next;
                List.Node<Integer> lastEven = null;
                while(runner != null && runner.data % 2 == 0)
                {
                    lastEven = runner;
                    runner = runner.next;
                }

                if(lastEven != null)
                {
                    reverseSublist(current, lastEven);
                }
            }

            head = head.next;
        }
    }

    static private void reverseSublist(List.Node<Integer> first, List.Node<Integer> last)
    {
        while(first != last)
        {
            int temp = first.data;
            first.data = last.data;
            last.data = temp;

            first = first.next;
            List.Node<Integer> runner = first;
            while(runner != last)
            {
                runner = runner.next;
            }
            last = runner;
        }
    }

    static boolean testsPass()
    {
        List<Integer> list = new List<>();
        list.add(1, 2, 3, 4, 5);
        List.Node<Integer> reversed = reverse(list.head);
        List.Node<Integer>[] arr = list.toArray(reversed);
        int[] a = Arrays.stream(arr).mapToInt(x -> x.data).toArray();
        boolean check = Arrays.equals(new int[] {5, 4, 3, 2, 1}, a);
        if(!check)
        {
            return false;
        }

        list = new List<>();
        list.add(1, 2, 8, 9, 12, 16);
        reverseEvenValueSublists(list.head);

        arr = list.toArray(list.head);
        a = Arrays.stream(arr).mapToInt(x -> x.data).toArray();
        check = Arrays.equals(new int[] {1, 8, 2, 9, 16, 12}, a);
        if(!check)
        {
            return false;
        }

        list = new List<>();
        list.add(2, 18, 24, 3, 5, 7, 9, 6, 12);
        reverseEvenValueSublists(list.head);
        arr = list.toArray(list.head);
        a = Arrays.stream(arr).mapToInt(x -> x.data).toArray();
        check = Arrays.equals(new int[] {24, 18, 2, 3, 5, 7, 9, 12, 6}, a);
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
