package problems.java.lists;

public class StartOfLoop
{
    static<T> List.Node<T> startOfLoop(List.Node<T> head)
    {
        if(head == null | head.next == null)
        {
            return null;
        }

        List.Node<T> slow = head, fast = head;
        while(fast != null && fast.next != null)
        {
            slow = slow.next;
            fast = fast.next.next;
            if(slow == fast)
            {
                break;
            }
        }

        if(fast == null || fast.next == null)
        {
            return null;
        }

        fast = head;
        while(slow != fast)
        {
            slow = slow.next;
            fast = fast.next;
        }

        return slow;
    }

    static boolean testsPass()
    {
        List.Node<Integer> n1 = new List.Node<>(1);
        List.Node<Integer> n2 = new List.Node<>(0);
        List.Node<Integer> n3 = new List.Node<>(5);
        List.Node<Integer> n4 = new List.Node<>(3);
        List.Node<Integer> n5 = new List.Node<>(7);
        List.Node<Integer> n6 = new List.Node<>(9);
        n1.next = n2; n2.next = n3; n3.next = n4;
        n4.next = n5; n5.next = n6; n6.next = n2;
        boolean check = startOfLoop(n1) == n2;
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
