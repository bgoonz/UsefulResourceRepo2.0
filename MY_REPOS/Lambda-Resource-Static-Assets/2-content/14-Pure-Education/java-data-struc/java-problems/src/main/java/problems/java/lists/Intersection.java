package problems.java.lists;

import static problems.java.lists.List.length;

public class Intersection
{
    //  Note: Do more testing
    static<T> List.Node<T> intersection(List.Node<T> n1, List.Node<T> n2)
    {
        int len1 = length(n1);
        int len2 = length(n2);
        for(; len1 > len2; len1--)
        {
            n1 = n1.next;
        }
        for(; len2 > len1; len2--)
        {
            n2 = n2.next;
        }
        while(n1 != null)
        {
            if(n1 == n2)
            {
                return n1;
            }
            n1 = n1.next;
            n2 = n2.next;
        }
        return null;
    }

    static boolean testsPass()
    {
        List.Node<Integer> a1 = new List.Node<>(1);
        List.Node<Integer> a2 = new List.Node<>(3);
        List.Node<Integer> a3 = new List.Node<>(5);
        List.Node<Integer> a4 = new List.Node<>(7);
        List.Node<Integer> a5 = new List.Node<>(9);
        a1.next = a2; a2.next = a3; a3.next = a4; a4.next = a5;
        List.Node<Integer> b1 = new List.Node<>(2);
        List.Node<Integer> b2 = new List.Node<>(4);
        List.Node<Integer> b3 = new List.Node<>(6);
        a1.next = a2; a2.next = a3; a3.next = a4; a4.next = a5;
        b1.next = b2; b2.next = b3; b3.next = a4;
        boolean check = intersection(a1, b1) == a4;
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
