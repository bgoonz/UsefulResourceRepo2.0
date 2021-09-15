package problems.java.lists;

public class ListToNumber
{
    static int addNumbersFromReversedLists(List<Integer> l1, List<Integer> l2)
    {
        return reversedListToNumber(l1) + reversedListToNumber(l2);
    }

    private static int reversedListToNumber(List<Integer> list)
    {
        List.Node<Integer> head = list.head;

        int pow = 0;
        int num = 0;
        while(head != null)
        {
            num += (int)Math.pow(10, pow++) * head.data;
            head = head.next;
        }
        return num;
    }

    ///////////////////////////////////////////////////////////////////////////
    static int addNumbersFromLists(List<Integer> l1, List<Integer> l2)
    {
        return listToNumber(l1) + listToNumber(l2);
    }

    private static int listToNumber(List<Integer> list)
    {
        List.Node<Integer> head = list.head;

        int num = 0;
        while(head != null)
        {
            num = num * 10 + head.data;
            head = head.next;
        }
        return num;
    }

    static boolean testsPass()
    {
        List<Integer> l1 = new List(), l2 = new List();
        l1.add(5).add(4).add(3);
        l2.add(7).add(6);
        boolean check = addNumbersFromReversedLists(l1, l2) == 412;
        if(!check)
        {
            return false;
        }
        check = addNumbersFromLists(l1, l2) == 619;
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
