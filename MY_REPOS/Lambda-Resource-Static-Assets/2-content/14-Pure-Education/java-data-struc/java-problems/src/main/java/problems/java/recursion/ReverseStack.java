package problems.java.recursion;

import java.util.Arrays;
import java.util.Stack;

public class ReverseStack
{
    static<T> void reverse(Stack<T> s)
    {
        if(!s.empty())
        {
            T data = s.pop();
            reverse(s);
            insertAtBottom(s, data);
        }
    }

    private static<T> void insertAtBottom(Stack<T> s, T val)
    {
        if(s.empty())
        {
            s.push(val);
        }
        else
        {
            T temp = s.pop();
            insertAtBottom(s, val);
            s.push(temp);
        }
    }

    static boolean testsPass()
    {
        Stack<Integer> s = new Stack<>();
        s.push(5); s.push(4); s.push(3); s.push(2); s.push(1);
        reverse(s);
        int[] a = s.stream().mapToInt(x -> x).toArray();
        boolean check = Arrays.equals(new int[] {1, 2, 3, 4, 5}, a);
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
