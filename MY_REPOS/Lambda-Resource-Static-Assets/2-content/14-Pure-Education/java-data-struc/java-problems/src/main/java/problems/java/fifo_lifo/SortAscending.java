package problems.java.fifo_lifo;

import java.util.Arrays;
import java.util.Stack;

public class SortAscending
{
    static Stack<Integer> sortAscending(Stack<Integer> stack)
    {
        Stack<Integer> sorted = new Stack<>();
        while(!stack.empty())
        {
            int val = stack.pop();
            if(sorted.empty())
            {
                sorted.push(val);
            }
            else
            {
                while(!sorted.empty() && sorted.peek() > val)
                {
                    stack.push(sorted.pop());
                }
                sorted.push(val);
            }
        }
        return sorted;
    }

    static boolean testsPass()
    {
        Stack<Integer> stack = new Stack<>();
        stack.push(3);
        stack.push(1);
        stack.push(4);
        stack.push(5);
        stack.push(2);

        int[] a = stack.stream().mapToInt(x -> x).toArray();
        boolean check = Arrays.equals(new int[] {3, 1, 4, 5, 2}, a);
        if(!check)
        {
            return false;
        }

        stack = sortAscending(stack);
        a = stack.stream().mapToInt(x -> x).toArray();
        check = Arrays.equals(new int[] {1, 2, 3, 4, 5}, a);
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
