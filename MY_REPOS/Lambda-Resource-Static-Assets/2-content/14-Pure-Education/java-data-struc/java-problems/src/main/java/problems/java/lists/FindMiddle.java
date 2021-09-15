package problems.java.lists;

public class FindMiddle
{
    static double midPointAverage(List.Node<Integer> head)
    {
        List.Node<Integer> slow = head, fast = head;
        int prevVal = 0;
        while(fast != null && fast.next != null)
        {
            prevVal = slow.data;
            slow = slow.next;
            fast = fast.next.next;
        }

        if(fast == null)    //  even number of nodes
        {
            return (prevVal + slow.data) / 2.0;
        }
        else
        {
            return slow.data;
        }
    }

    static boolean testsPass()
    {
        List<Integer> l1 = new List<>();
        l1.add(1, 2, 3, 4, 5, 6);
        boolean check = midPointAverage(l1.head) == 3.5;
        if(!check)
        {
            return false;
        }
        List<Integer> l2 = new List<>();
        l2.add(1, 2, 3, 4, 5, 6, 7);
        check = midPointAverage(l2.head) == 4;
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
