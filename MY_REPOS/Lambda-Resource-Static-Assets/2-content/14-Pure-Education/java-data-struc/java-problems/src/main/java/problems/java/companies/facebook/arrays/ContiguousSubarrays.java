package problems.java.companies.facebook.arrays;

import java.util.Arrays;

public class ContiguousSubarrays
{
    /*
    Arrays
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=226517205173943

    You are given an array arr of N integers. For each index i, you are required to determine the number of contiguous subarrays
    that fulfills the following conditions:
        The value at index i must be the maximum element in the contiguous subarrays, and
        These contiguous subarrays must either start from or end on index i.
        Example:
            arr = [3, 4, 1, 6, 2]
            output = [1, 3, 1, 5, 1]
        For index 0 - [3] is the only contiguous subarray that starts (or ends) with 3, and the maximum value in this subarray is 3.
        For index 1 - [4], [3, 4], [4, 1]
        For index 2 - [1]
        For index 3 - [6], [6, 2], [1, 6], [4, 1, 6], [3, 4, 1, 6]
        For index 4 - [2]
    */

    static int[] countSubarrays(int[] a)
    {
        int len = a.length;

        int[] dp = new int[len];
        Arrays.fill(dp, 1);

        for(int i = 0; i < len; ++i)
        {
            int current = a[i];
            int left = i - 1, right = i + 1;

            while(left >= 0 && current > a[left])
            {
                dp[i]++;
                left--;
            }

            while(right < len && current > a[right])
            {
                dp[i]++;
                right++;
            }
        }

        return dp;

    }

    static boolean testsPass()
    {
        boolean check = Arrays.equals(countSubarrays(new int[] {3, 4, 1, 6, 2}),
                new int[] {1, 3, 1, 5, 1});
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
