package problems.java.special;

import java.util.Arrays;

public class ReduceComplexity
{
    static int countThreeSum(int[] a, int target)
    {
        //  Note: no sorting - brute force
        //  Complexity = N(N - 1)(N - 2) / 3! ~ n^3/6

        int len = a.length, count = 0;
        for(int i = 0; i < len; ++i)
        {
            for(int j = i + 1; j < len; ++j)
            {
                for(int k = j + 1; k < len; ++k)
                {
                    if(a[i] + a[j] + a[k] == target)
                    {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    static int countThreeSumWithSort(int[] a, int target)
    {
        //  Complexity = N^2 * lnN

        Arrays.sort(a);
        int len = a.length, count = 0;
        for(int i = 0; i < len; ++i)
        {
            int j = i + 1, k = len - 1;
            while(j < k)
            {
                int sum = a[i] + a[j] + a[k];
                if(sum == target)
                {
                    count++;
                    j++;
                    k--;
                }
                else if(sum > target)
                {
                    k--;
                }
                else
                {
                    j++;
                }
            }
        }
        return count;
    }
}
