package problems.java.fifo_lifo;

import java.util.Stack;

public class ProductOfDigits
{
    //  455 is a result of 100
    //  100 = 4 * 5 * 5

    static int productOfDigits(int n)
    {
        Stack<Integer> stack = new Stack<>();
        for(int i = 9; i > 1; --i)
        {
            while(n % i == 0)
            {
                stack.push(i);
                n /= i;
            }
         }

        int result = 0;
        while(!stack.empty())
        {
            result = result * 10 + stack.pop();
        }
        return result;
    }

    static boolean testsPass()
    {
        boolean check = productOfDigits(100) == 455;
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
