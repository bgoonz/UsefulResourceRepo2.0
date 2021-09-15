package problems.java.lists;

public class FlattenDownNode
{
    static class DownNode<T>
    {
        public T data;
        public DownNode<T> down;
        public DownNode<T> next;
        public DownNode(T data)
        {
            this.data = data;
        }
    }

    static<T> void flatten(DownNode<T> head)
    {
        while(head != null)
        {
            DownNode<T> down = head.down;
            if(head.down != null)
            {
                DownNode<T> temp = head.next;
                while(down.next != null)
                {
                    down = down.next;
                }
                head.next = head.down;
                down.next = temp;

            }
            head = head.next;
        }
    }

    static boolean testsPass()
    {
        DownNode<Integer> n11 = new DownNode(11);
        DownNode<Integer> n12 = new DownNode(12);
        DownNode<Integer> n13 = new DownNode(13);
        DownNode<Integer> n21 = new DownNode(21);
        DownNode<Integer> n22 = new DownNode(22);
        DownNode<Integer> n23 = new DownNode(23);
        DownNode<Integer> n31 = new DownNode(31);
        DownNode<Integer> n41 = new DownNode(41);
        DownNode<Integer> n42 = new DownNode(42);
        n11.next = n12; n12.next = n13;
        n12.down = n21; n21.next = n22; n22.next = n23;
        n22.down = n31;
        n31.down = n41;
        n41.next = n42;
        flatten(n11);
        DownNode<Integer> head = n11;
        boolean check = head.data == 11;
        if(!check)
        {
            return false;
        }
        DownNode<Integer> next = head.next;
        check = next.data == 12;
        if(!check)
        {
            return false;
        }
        next = next.next;
        check = next.data == 21;
        if(!check)
        {
            return false;
        }
        next = next.next;
        check = next.data == 22;
        if(!check)
        {
            return false;
        }
        next = next.next;
        check = next.data == 31;
        if(!check)
        {
            return false;
        }
        next = next.next;
        check = next.data == 41;
        if(!check)
        {
            return false;
        }
        next = next.next;
        check = next.data == 42;
        if(!check)
        {
            return false;
        }
        next = next.next;
        check = next.data == 23;
        if(!check)
        {
            return false;
        }
        next = next.next;
        check = next.data == 13;
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
