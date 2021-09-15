package problems.java.arrays;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Leaders
{
    /*
    Given an array A of positive integers.
    Find the leaders in the array.
    An element of array is leader if it is greater than or equal
    to all the elements to its right side.
    The rightmost element is always a leader.
    Example:
        Input: [16,17,4,3,5,2]
        Output: 17 5 2
    */

    static int[] arrayLeaders(int[] a)
    {
        if(a.length < 2)
        {
            return new int[] {a[0]};
        }

        List<Integer> result = new ArrayList<>();

        result.add(a[a.length - 1]);
        int max = a[a.length - 1];
        for(int i = a.length - 2; i >= 0; --i)
        {
            if(a[i] > max)
            {
                max = a[i];
                result.add(max);
            }
        }

        Collections.reverse(result);
        return result.stream().mapToInt(x -> x).toArray();
    }

    static boolean testsPass()
    {
        boolean check = Arrays.equals(
                arrayLeaders(new int[] {6, 17, 4, 3, 5, 2}), new int[] {17, 5, 2});
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
