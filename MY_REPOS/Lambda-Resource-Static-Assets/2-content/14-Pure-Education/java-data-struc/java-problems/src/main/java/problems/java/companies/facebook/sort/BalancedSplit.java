package problems.java.companies.facebook.sort;

import java.util.Arrays;

public class BalancedSplit
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=226994905008716

    Given an array of integers (which may include repeated integers),
    determine if there's a way to split the array into two subsequences A and B such that the sum of the integers in both arrays is the same,
    and all of the integers in A are strictly smaller than all of the integers in B.
    Example:
        arr = [1, 5, 7, 1]
        output = true
        We can split the array into A = [1, 1, 5] and B = [7].
    Example:
        arr = [12, 7, 6, 7, 6]
        output = false
        We can't split the array into A = [6, 6, 7] and B = [7, 12] since this doesn't satisfy the requirement
        that all integers in A are smaller than all integers in B.
    */

    static boolean balancedSplitExists(int[] a)
    {
        Arrays.sort(a);
        int mid = a.length / 2;

        for(int i = mid; i < a.length; ++i)
        {
            int leftSum = sum(a, 0, i);
            int rightSum = sum(a, i, a.length);
            if(leftSum == rightSum && a[i - 1] < a[i])
            {
                return true;
            }
        }
        return false;
    }

    static private int sum(int[] a, int start, int end)
    {
        int sum = 0;
        for(int i = start; i < end; ++i)
        {
            sum += a[i];
        }
        return sum;
    }


    static boolean testsPass()
    {
        boolean check = balancedSplitExists(new int[] {1, 5, 7, 1}) == true;
        if(!check)
        {
            return false;
        }

        check = balancedSplitExists(new int[] {12, 7, 6, 7, 6}) == false;
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
