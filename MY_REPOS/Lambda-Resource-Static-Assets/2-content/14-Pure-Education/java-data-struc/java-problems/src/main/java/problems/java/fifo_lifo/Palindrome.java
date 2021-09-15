package problems.java.fifo_lifo;

import problems.java.lists.List;

import java.util.Stack;

public class Palindrome
{
    static boolean isPalindromeString(String s)
    {
        Stack<Character> stack = new Stack<>();

        int i = 0;
        while(i < s.length() / 2)
        {
            stack.push(s.charAt(i++));
        }

        if(s.length() % 2 == 1)
        {
            i++;
        }

        while(i < s.length())
        {
            if(s.charAt(i++) != stack.pop())
            {
                return false;
            }
        }
        return true;
    }

    static<T extends Comparable<T>> boolean isPalindromeList(List<T> list)
    {
        Stack<T> stack = new Stack<>();
        List.Node<T> slow = list.head, fast = list.head;
        while(fast != null && fast.next != null)
        {
            stack.push(slow.data);
            slow = slow.next;
            fast = fast.next.next;
        }

        if(fast != null)
        {
            slow = slow.next;
        }

        while(slow != null)
        {
            if(slow.data.compareTo(stack.pop()) != 0)
            {
                return false;
            }
            slow = slow.next;
        }
        return true;
    }

    static boolean testsPass()
    {
        String s1 = "abcddcba", s2 = "abcdcba", s3 = "abcdba";
        boolean check = isPalindromeString(s1);
        if(!check)
        {
            return false;
        }
        check = isPalindromeString(s2);
        if(!check)
        {
            return false;
        }
        check = isPalindromeString(s3);
        if(check)
        {
            return false;
        }
        List<Integer> l1 = new List<>();
        l1.add(1, 2, 3, 4, 3, 2, 1);
        check = isPalindromeList(l1) == true;
        if(!check)
        {
            return false;
        }
        List<Integer> l2 = new List<>();
        l2.add(1, 2, 3, 4, 5, 2, 1);
        check = isPalindromeList(l2) == true;
        if(check)
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
