package problems.java.numbers;

public class NumberFromIntsArray
{
    static int letToRight(int [] a)
    {
        int val = 0;
        for(int v : a)
        {
            val = val * 10 + v;
        }
        return val;
    }

    static int rightToLeft(int [] a)
    {
        int val = 0; int pos = 0;
        for(int i = a.length - 1; i >= 0; --i)
        {
            val += Math.pow(10, pos++) * a[i];
        }
        return val;
    }

    static boolean testsPass()
    {
        boolean check = letToRight(new int[] {3, 4, 5, 6}) == 3456;
        if(!check)
        {
            return false;
        }
        check = rightToLeft(new int[] {3, 4, 5, 6}) == 3456;
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
