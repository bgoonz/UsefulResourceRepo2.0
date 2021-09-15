package problems.java.companies.facebook.lists;

import problems.java.lists.List;

import java.util.Arrays;

public class ReverseOperations
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=623634548182866

    You are given a singly-linked list that contains N integers. A subpart of the list is a contiguous set of even elements, bordered either by either end of the list or an odd element. For example, if the list is [1, 2, 8, 9, 12, 16], the subparts of the list are [2, 8] and [12, 16].
    Then, for each subpart, the order of the elements is reversed. In the example, this would result in the new list, [1, 8, 2, 9, 16, 12].
    The goal of this question is: given a resulting list, determine the original order of the elements.
    Example:
        input =  [1, 2, 8, 9, 12, 16]
        output = [1, 8, 2, 9, 16, 12]
    */

    static List.Node<Integer> reverse(List.Node<Integer> head)
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
                    reverse(current, lastEven);
                }
            }

            head = head.next;
        }

        return head;
    }

    static private void reverse(List.Node<Integer> first, List.Node<Integer> last)
    {
        while(first != last)
        {
            int temp = first.data;
            first.data = last.data;
            last.data = temp;

            first = first.next;
            List.Node<Integer> newLast = first;
            while(newLast != last)
            {
                newLast = newLast.next;
            }
            last = newLast;
        }
    }

    static boolean testsPass()
    {
        List<Integer> list = new List<>();
        list.add(1, 2, 8, 9, 12, 16);
        reverse(list.head);

        List.Node<Integer>[] arr = list.toArray(list.head);
        int[] a = Arrays.stream(arr).mapToInt(x -> x.data).toArray();
        boolean check = Arrays.equals(new int[] {1, 8, 2, 9, 16, 12}, a);
        if(!check)
        {
            return false;
        }

        list = new List<>();
        list.add(2, 18, 24, 3, 5, 7, 9, 6, 12);
        reverse(list.head);
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
