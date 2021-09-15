package problems.java.dynamic;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SubArrayAverageSum
{
    /*
    You are given an array A containing N integers.
    Your task is to find all subarrays whose average sum is greater than
    the average sum of the remaining array elements.
    Example:
        Input:  [3, 4, 2]
        Output:
            Count = 3, [3, 4], [3, 4, 2], [4]
            Explanation: (3+4) / 2 > 2, (3+4+2) / 3 > {}, 4 > (3+2) / 2
    */

    public static int countSubArrays(int[] a)
    {
        int len = a.length;
        int[] dp = new int[len + 1];

        for(int i = 1; i < dp.length; ++i)
        {
            dp[i] = a[i - 1] + dp[i - 1];
        }

        int count = 0;
        for(int i = 0; i < dp.length - 1; ++i)
        {
            for(int j = i + 1; j < dp.length; ++j)
            {
                int includeSum = dp[j] - dp[i];
                int includeCount = j - i;

                int excludeSum = dp[len] - includeSum;
                int excludeCount = Math.max(1, len - includeCount);

                int includeAverage = includeSum / includeCount;
                int excludeAverage = excludeSum / excludeCount;

                count += (includeAverage > excludeAverage ? 1 : 0);
            }
        }
        return count;
    }

    static List<int[]> subArraysIndeces(int[] a)
    {
        int len = a.length;
        int[] dp = new int[len + 1];

        for(int i = 1; i < dp.length; ++i)
        {
            dp[i] = a[i - 1] + dp[i - 1];
        }

        List<int[]> result = new ArrayList<>();

        for(int i = 0; i < dp.length - 1; ++i)
        {
            for(int j = i + 1; j < dp.length; ++j)
            {
                int includeSum = dp[j] - dp[i];
                int includeCount = j - i;

                int excludeSum = dp[len] - includeSum;
                int excludeCount = Math.max(1, len - includeCount);

                int includeAverage = includeSum / includeCount;
                int excludeAverage = excludeSum / excludeCount;

                if(includeAverage > excludeAverage)
                {
                    result.add(new int[] {i, j - 1});
                }
            }
        }
        return result;
    }

    static List<int[]> subArraysValues(int[] a)
    {
        List<int[]> result = new ArrayList<>();
        List<int[]> indexList = subArraysIndeces(a);
        for(int[] sub : indexList)
        {
            int[] vals = new int[sub[1] - sub[0] + 1];
            for(int i = sub[0], pos = 0; i <= sub[1]; ++i)
            {
                vals[pos++] = a[i];
            }
            result.add(vals);
        }
        return result;
    }

    static boolean testsPass()
    {
        boolean check = countSubArrays(new int[] {3, 4, 2}) == 3;
        if(!check)
        {
            return false;
        }

        List<int[]> result = subArraysIndeces(new int[] {3, 4, 2});
        check = Arrays.equals(new int[] {0, 1}, result.get(0)) &&
                Arrays.equals(new int[] {0, 2}, result.get(1)) &&
                Arrays.equals(new int[] {1, 1}, result.get(2));


        result = subArraysValues(new int[] {3, 4, 2});
        check = Arrays.equals(new int[] {3, 4, 2}, result.get(0)) &&
                Arrays.equals(new int[] {3, 4, 2}, result.get(1)) &&
                Arrays.equals(new int[] {4}, result.get(2));

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
