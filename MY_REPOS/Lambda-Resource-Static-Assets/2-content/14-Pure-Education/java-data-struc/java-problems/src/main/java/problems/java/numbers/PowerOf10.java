package problems.java.numbers;

public class PowerOf10
{
    static boolean isPowerOf10(int n)
    {
        for(int i = 1; i <= n; i *= 10)
        {
            if(i == n)
            {
                return true;
            }
            if(i > Integer.MAX_VALUE / 10)
            {
                return false;
            }
        }
        return false;
    }

    static boolean testsPass()
    {
        boolean check = isPowerOf10(1) &&
                isPowerOf10(10) &&
                isPowerOf10(100) &&
                isPowerOf10(1000) &&
                isPowerOf10(1000000);
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
