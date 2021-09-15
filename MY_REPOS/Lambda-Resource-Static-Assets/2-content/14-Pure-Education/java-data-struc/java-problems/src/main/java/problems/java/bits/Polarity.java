package problems.java.bits;

public class Polarity
{
    static int polarity(int n)
    {
        int count = 0;
        for(int i = n; i > 0; i >>= 1)
        {
            count += (i & 1);
        }
        return count;
    }

    static boolean testsPass()
    {
        boolean check = polarity(15) == 4;
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
