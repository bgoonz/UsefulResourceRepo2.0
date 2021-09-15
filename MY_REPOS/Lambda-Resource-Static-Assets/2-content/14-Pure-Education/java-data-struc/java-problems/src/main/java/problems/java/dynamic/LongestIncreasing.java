package problems.java.dynamic;

import java.util.Arrays;
import java.util.stream.Collectors;

public class LongestIncreasing
{
    static int[] longestIncreasingRun(int[] a)
    {
        //  input:  {3, 4, 5, 2, 3, 4, 5, 7, 1, 2} - from index 3 to index 7
        //  dp:     {1, 2, 3, 1, 2, 3, 4, 5, 1, 2}

        int[] dp = new int[a.length];
        dp[0] = 1;
        for(int i = 1; i < a.length; ++i)
        {
            if(a[i] > a[i - 1])
            {
                dp[i] = dp[i - 1] + 1;
            }
            else
            {
                dp[i] = 1;
            }
        }

        int maxValInDP = Arrays.stream(dp).max().getAsInt();
        int indexOfMax = Arrays.stream(dp).boxed().collect(Collectors.toList()).indexOf(maxValInDP);

        return new int[] {indexOfMax - maxValInDP + 1, indexOfMax};
    }

    static int longestIncreasingSubsequence(int[] a)
    {
        //  {10, 22, 9, 33, 21, 50, 41, 60, 80} -> {10, 22, 33, 50, 60, 80}
        //  DP Array:
        //  Initial State:                      Final State:
        //  {1, 1, 1, 1, 1, 1, 1, 1, 1}         Data:   {10, 22, 9, 33, 21, 50, 41, 60, 80}
        //                                      DP:     { 1,  2, 1,  3,  2,  4,  4,  5,  6}

        int[] dp = new int[a.length];
        Arrays.fill(dp, 1);

        for(int i = 1; i < a.length; ++i)
        {
            for(int j = 0; j < i; ++j)
            {
                if(a[i] > a[j] && dp[i] <= dp[j])
                {
                    dp[i] = dp[j] + 1;
                }
            }
        }

        return Arrays.stream(dp).max().getAsInt();
    }

    static boolean testsPass()
    {
        int[] result = longestIncreasingRun(new int[] {3, 4, 5, 2, 3, 4, 5, 7, 1, 2});
        boolean check = result[0] == 3 && result[1] == 7;
        if(!check)
        {
            return false;
        }
        check = longestIncreasingSubsequence(new int[] {10, 22, 9, 33, 21, 50, 41, 60, 80}) == 6;
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
