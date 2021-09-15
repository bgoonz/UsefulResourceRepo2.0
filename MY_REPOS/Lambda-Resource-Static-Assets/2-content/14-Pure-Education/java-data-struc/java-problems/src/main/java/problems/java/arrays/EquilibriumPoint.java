package problems.java.arrays;

import java.util.Arrays;

public class EquilibriumPoint
{
    /*
    Equilibrium Point in an array is a position such that the
    sum of elements before it is equal to the sum of elements after it.
    Example:
        Input:  {1,3,5,2,2}
        Output: 2, (1+3) = (2+2)
    */

    static int equilibriumIndex(int[] a)
    {
        if(a == null || a.length < 3)
        {
            return -1;
        }

        int sum = Arrays.stream(a).sum();
        int leftSum = a[0];

        for(int i = 1; i < a.length; ++i)
        {
            if((sum - a[i]) / 2 == leftSum)
            {
                return i;
            }
            leftSum += a[i];
        }
        return -1;
    }

    static boolean testsPass()
    {
        boolean check = equilibriumIndex(new int[] {1, 3, 5, 2, 2}) == 2;
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
