package problems.java.fifo_lifo;

import java.util.Stack;

public class MinStack extends Stack<Integer>
{
    private Stack<Integer> minStack = new Stack<>();

    @Override
    public Integer push(Integer item)
    {
        if(item < min())
        {
            minStack.push(item);
        }
        return super.push(item);
    }

    @Override
    public synchronized Integer pop()
    {
        int val = super.pop();
        if(val == minStack.peek())
        {
            minStack.pop();
        }
        return val;
    }

    public int min()
    {
        return minStack.empty() ? Integer.MAX_VALUE : minStack.peek();
    }

    static boolean testsPass()
    {
        MinStack minStack = new MinStack();
        minStack.push(3);
        minStack.push(5);
        minStack.push(1);
        minStack.push(4);
        minStack.push(2);

        boolean check = minStack.min() == 1;
        if(!check)
        {
            return false;
        }

        check = minStack.pop() == 2;
        if(!check)
        {
            return false;
        }

        check = minStack.min() == 1;
        if(!check)
        {
            return false;
        }

        check = minStack.pop() == 4;
        if(!check)
        {
            return false;
        }

        check = minStack.min() == 1;
        if(!check)
        {
            return false;
        }

        check = minStack.pop() == 1;
        if(!check)
        {
            return false;
        }

        check = minStack.min() == 3;
        if(!check)
        {
            return false;
        }

        check = minStack.pop() == 5;
        if(!check)
        {
            return false;
        }

        check = minStack.min() == 3;
        if(!check)
        {
            return false;
        }

        check = minStack.pop() == 3;
        if(!check)
        {
            return false;
        }

        check = minStack.min() == Integer.MAX_VALUE;
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
