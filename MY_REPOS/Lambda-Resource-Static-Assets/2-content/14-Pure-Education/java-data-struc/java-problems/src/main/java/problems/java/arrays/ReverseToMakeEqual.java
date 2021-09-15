package problems.java.arrays;

import java.util.Arrays;

public class ReverseToMakeEqual
{
//  Given two arrays A and B of length N, determine if there is a way to make A equal to B by reversing any subarrays
//  from array B any number of times.
//      A = [1, 2, 3, 4]
//      B = [1, 4, 3, 2]
//      output = true
//  After reversing the subarray of B from indices 1 to 3, array B will equal array A.

    static boolean areTheyEqual(int[] a1, int[] a2)
    {
        if(a1.length != a2.length)
        {
            return false;
        }

        for(int i = 0; i < a1.length - 1; ++i)
        {
            for(int j = i + 1; j < a1.length; ++j)
            {
                int[] temp = reverse(a1, i, j);
                if(Arrays.equals(a2, temp))
                {
                    return true;
                }
            }
        }
        return false;
    }

    private static int[] reverse(int[] a, int from, int to)
    {
        int[] result = new int[a.length];
        System.arraycopy(a, 0, result, 0, result.length);
        while(from < to)
        {
            int temp = result[from];
            result[from++] = result[to];
            result[to--] = temp;
        }
        return result;
    }

    static boolean testsPass()
    {
        boolean check = areTheyEqual(new int[] {1, 2, 3, 4}, new int[] {1, 4, 3, 2});
        if(!check)
        {
            return false;
        }

        check = areTheyEqual(new int[] {1, 2, 3, 4}, new int[] {4, 1, 3, 2});
        if(check)
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
