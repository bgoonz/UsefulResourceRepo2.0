package problems.java.lists;

import java.util.Arrays;

public class MergeSorted
{
    static List<Integer> mergeSorted(List.Node<Integer> n1, List.Node<Integer> n2)
    {
        List<Integer> result = new List<>();
        while(n1 != null && n2 != null)
        {
            List.Node<Integer> n;
            if(n1.data < n2.data)
            {
                n = new List.Node<>(n1.data);
                n1 = n1.next;
            }
            else
            {
                n = new List.Node<>(n2.data);
                n2 = n2.next;
            }
            result.add(n);
        }

        if(n1 != null)
        {
            result.add(n1);
        }
        if(n2 != null)
        {
            result.add(n2);
        }
        return result;
    }

    static boolean testsPass()
    {
        List<Integer> l1 = new List<>(), l2 = new List<>();
        l1.add(1, 3, 5);
        l2.add(2, 4, 6, 8);
        List<Integer> sortedList = mergeSorted(l1.head, l2.head);
        List.Node<Integer>[] nodes = sortedList.toArray(l1.head.getClass(), sortedList.length());
        int[] ints = Arrays.stream(nodes).mapToInt(x -> x.data).toArray();
        Arrays.equals(new int[] {1, 2, 3, 4, 5, 6, 8}, ints);
        boolean check = Arrays.equals(new int[] {1, 2, 3, 4, 5, 6, 8}, ints);
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
