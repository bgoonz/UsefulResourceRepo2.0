package problems.java.arrays;

import java.util.HashSet;
import java.util.Set;

public class FirstMissingPositive
{

    static int firstSmallestMissingPositive(int[] a)
    {
        int firstMin = 1;

        Set<Integer> set = new HashSet<>();

        for(int v : a)
        {
            set.add(v);

            if(v == firstMin)
            {
                while(set.contains(firstMin))
                {
                    firstMin++;
                }
            }
        }
        return firstMin;
    }

    static boolean testsPass()
    {
        boolean check = firstSmallestMissingPositive(new int[] {1, 3, 4, 2}) == 5;
        if(!check)
        {
            return false;
        }

        check = firstSmallestMissingPositive(new int[] {4, 1, 3}) == 2;
        if(!check)
        {
            return false;
        }

        check = firstSmallestMissingPositive(new int[] {7, 8, 9, 11, 12}) == 1;
        if(!check)
        {
            return false;
        }
        check = firstSmallestMissingPositive(new int[] {2, 3, 1}) == 4;
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
