package problems.java.lists;

import java.util.Arrays;

public class DeleteEveryOther
{
    static<T> void deleteEveryOther(List.Node<T> head)
    {
        while(head != null && head.next != null)
        {
            head.next = head.next.next;
            head = head.next;
        }
    }

    static boolean testsPass()
    {
        List<Integer> list = new List<>();
        list.add(1, 2, 3, 4, 5, 6);
        deleteEveryOther(list.head);
        List.Node<Integer>[] result = list.toArray(list.head.getClass(), 3);
        int[] a = Arrays.stream(result).mapToInt(x -> x.data).toArray();
        boolean check = Arrays.equals(new int[] {1, 3, 5}, a);
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
