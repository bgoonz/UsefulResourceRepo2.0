package problems.java.lists;

import java.util.Arrays;

public class PairwiseSwap
{
    static<T> void pairwiseSwap(List.Node<T> head)
    {
        while(head != null && head.next != null)
        {
            T currentData = head.data;
            head.data = head.next.data;
            head.next.data = currentData;
            head = head.next.next;
        }
    }

    static boolean testsPass()
    {
        List<Integer> list = new List<>();
        list.add(1, 2, 3, 4, 5, 6);
        pairwiseSwap(list.head);
        List.Node<Integer>[] result = list.toArray(list.head.getClass(), 6);
        int[] a = Arrays.stream(result).mapToInt(x -> x.data).toArray();
        boolean check = Arrays.equals(new int[] {2, 1, 4, 3, 6, 5}, a);
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
