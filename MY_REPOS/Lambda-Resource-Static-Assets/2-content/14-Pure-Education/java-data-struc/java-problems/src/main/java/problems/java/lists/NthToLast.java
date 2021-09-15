package problems.java.lists;

public class NthToLast
{
    static<T extends Comparable<T>> List.Node<T> nthToLast(List.Node<T> head, int n)
    {
        List.Node<T> slow = head;
        List.Node<T> fast = head;

        while(n > 0 && fast != null)
        {
            fast = fast.next;
            n--;
        }

        if(fast == null)
        {
            return null;
        }

        while(fast != null)
        {
            slow = slow.next;
            fast = fast.next;
        }

        return slow;
    }

    static boolean testsPass()
    {
        List<Integer> list = new List<>();
        list.add(1, 2, 3, 4, 5, 6, 7);
        List.Node<Integer> n = nthToLast(list.head, 2);
        boolean check = n.data == 6;
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
