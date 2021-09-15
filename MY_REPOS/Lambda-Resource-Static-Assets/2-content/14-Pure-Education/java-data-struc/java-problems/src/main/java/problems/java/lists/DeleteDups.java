package problems.java.lists;

import java.util.Arrays;

public class DeleteDups
{
    //  See also
    //  https://leetcode.com/discuss/interview-question/910392/Facebook-or-Phone-or-Remove-Duplicates-from-Sorted-List
    static void deleteDups(List.Node<Integer> head)
    {
        while(head != null)
        {
            List.Node<Integer> runner = head;
            while(runner.next != null)
            {
                if(head.data == runner.next.data)
                {
                    runner.next = runner.next.next;
                }
                else
                {
                    runner = runner.next;
                }
            }
            head = head.next;
        }
    }

    static void deletedDupsFromSorted(List.Node<Integer> head)
    {
        while(head != null)
        {
            List.Node<Integer> runner = head;
            while(runner.next != null && runner.next.data == head.data)
            {
                runner.next = runner.next.next;
            }
            head = head.next;
        }
    }

    static boolean testsPass()
    {
        List<Integer> list1 = new List<>();
        list1.add(1, 2, 3, 1, 2, 4, 3, 1);
        deleteDups(list1.head);

        List.Node<Integer>[] result = list1.toArray(List.Node.class, 4);
        int[] a = Arrays.stream(result).mapToInt(x -> x.data).toArray();
        boolean check = Arrays.equals(a, new int[] {1, 2, 3, 4});
        if(!check)
        {
            return false;
        }

        List<Integer> list2 = new List<>();
        list2.add(1, 2, 2, 3, 3, 3, 3, 3);
        deletedDupsFromSorted(list2.head);
        result = list2.toArray(List.Node.class, 3);
        a = Arrays.stream(result).mapToInt(x -> x.data).toArray();
        check = Arrays.equals(a, new int[] {1, 2, 3});
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
