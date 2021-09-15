package problems.java.bits;

public class Max
{
    static int max(int a, int b)
    {
        int c = a - b;
        int sign = (c >> 31) & 1;
        return a - c * sign;
    }

    static boolean testsPass()
    {
        boolean check = max(5, 3) == 5;
        if(!check)
        {
            return false;
        }
        check = max(3, 5) == 5;
        if(!check)
        {
            return false;
        }
        check = max(-1, -2) == -1;
        if(!check)
        {
            return false;
        }
        check = max(-2, -1) == -1;
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
