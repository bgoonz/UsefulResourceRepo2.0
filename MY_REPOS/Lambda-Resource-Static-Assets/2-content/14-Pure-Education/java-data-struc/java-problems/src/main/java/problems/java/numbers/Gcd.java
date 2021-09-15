package problems.java.numbers;

public class Gcd
{
    static int findGcd(int a, int b)
    {
        int min = Math.min(Math.abs(a), Math.abs(b));
        for(int i = min; i > 0; --i)
        {
            if(a % i == 0 && b % i == 0)
            {
                return i;
            }
        }
        return -1;
    }

    static boolean testsPass()
    {
        boolean check = findGcd(8, 36) == 4;
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
