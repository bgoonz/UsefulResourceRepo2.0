package problems.java.numbers;

import static problems.java.recursion.NumericOperations.gcd;

public class GcdFromArray
{
    static int gcdFromArray(int[] a)
    {
        int minGcd = Integer.MAX_VALUE;
        for(int i = 0; i < a.length - 1; ++i)
        {
            for(int j = i + 1; j < a.length; ++j)
            {
                minGcd = Math.min(minGcd, gcd(a[i], a[j]));
            }
        }
        return minGcd;
    }

    static boolean testsPass()
    {
        boolean check = gcdFromArray(new int[] {12, 36, 24, 8}) == 4;
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
