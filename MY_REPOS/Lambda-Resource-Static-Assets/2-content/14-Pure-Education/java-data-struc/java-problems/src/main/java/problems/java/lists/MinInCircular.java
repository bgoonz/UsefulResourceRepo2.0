package problems.java.lists;

public class MinInCircular
{
    static int minInCircular(List.Node<Integer> head)
    {
        int min = head.data;
        List.Node<Integer> start = head.next;
        while(start != head)
        {
            min = Math.min(min, start.data);
            start = start.next;
        }
        return min;
    }

    static boolean testsPass()
    {
        List.Node<Integer> n1 = new List.Node<>(1);
        List.Node<Integer> n2 = new List.Node<>(0);
        List.Node<Integer> n3 = new List.Node<>(5);
        List.Node<Integer> n4 = new List.Node<>(3);
        List.Node<Integer> n5 = new List.Node<>(7);
        List.Node<Integer> n6 = new List.Node<>(9);
        List.Node<Integer> n7 = new List.Node<>(-3);
        n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n5; n5.next = n6; n6.next = n7; n7.next = n1;
        boolean check = minInCircular(n1) == -3;
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
