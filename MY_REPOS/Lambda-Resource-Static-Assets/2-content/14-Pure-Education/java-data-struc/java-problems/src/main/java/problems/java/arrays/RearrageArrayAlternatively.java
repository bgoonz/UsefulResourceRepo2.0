package problems.java.arrays;

import java.util.Arrays;

public class RearrageArrayAlternatively
{
    /*
    Given a sorted array of positive integers.
    Rearrange the array elements alternatively
    i.e first element should be max value, second should be min value,
    third should be second max, fourth should be second min and so on.
    Example:
        Input:  {1,2,3,4,5,6}
        Output: {6,1,5,2,4,3}
    */

    static int[] rearrangeAlternatively(int[] a)
    {
        int len = a.length;
        int[] result = new int[len];

        int left = 0, right = len - 1;
        for(int i = 0; i < len - 1; i += 2)
        {
            result[i] = a[right--];
            result[i + 1] = a[left++];
        }

        if(len % 2 == 1)
        {
            result[len - 1] = a[len / 2];
        }

        return result;
    }

    static boolean testsPass()
    {
        boolean check = Arrays.equals(rearrangeAlternatively(new int [] {1, 2, 3, 4, 5, 6}),
                new int[] {6, 1, 5, 2, 4, 3});

        if(!check)
        {
            return false;
        }

        check = Arrays.equals(rearrangeAlternatively(new int [] {1, 2, 3, 4, 5, 6, 7}),
                new int[] {7, 1, 6, 2, 5, 3, 4});

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
