package problems.java.dynamic;

public class StairWalk
{
    static int countWays(int n)
    {
        if(n < 0) return 0;
        if(n == 0) return 1;
        if(n < 3) return n;
        int a = 1, b = 1, c = 2, d;
        for(int i = 3; i <= n; ++i)
        {
            d = a + b + c;
            a = b;
            b = c;
            c = d;
        }
        return c;
    }

    static boolean testsPass()
    {
        boolean check = countWays(10) == 274;
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
