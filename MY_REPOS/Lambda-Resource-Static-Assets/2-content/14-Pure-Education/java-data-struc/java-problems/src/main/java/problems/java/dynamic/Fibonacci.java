package problems.java.dynamic;

public class Fibonacci
{
    static int fibonacci(int n)
    {
        if(n < 0)
        {
            return -1;
        }
        if(n < 2)
        {
            return n;
        }

        int a = 0, b = 1, c;
        for(int i = 2; i <= n; ++i)
        {
            c = a + b;
            a = b;
            b = c;
        }

        return b;
    }

    static boolean testsPass()
    {
        boolean check = fibonacci(14) == 377;
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
