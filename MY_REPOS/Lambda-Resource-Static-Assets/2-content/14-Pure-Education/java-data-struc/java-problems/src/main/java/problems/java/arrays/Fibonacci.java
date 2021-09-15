package problems.java.arrays;

public class Fibonacci
{
    static int fibonacci(int n)
    {
        // n:   0 1 2 3 4 5 6  7  8  9 10 11  12  13  14
        //f(n): 0 1 1 2 3 5 8 13 21 34 55 89 144 233 377
        if(n < 0)
        {
            return -1;
        }
        if(n < 2)
        {
            return n;
        }

        int[] fibs = new int[n + 1];

        fibs[0] = 0;
        fibs[1] = 1;

        for(int i = 2; i <= n; ++i)
        {
            fibs[i] = fibs[i - 1] + fibs[i - 2];
        }
        return fibs[n];
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
