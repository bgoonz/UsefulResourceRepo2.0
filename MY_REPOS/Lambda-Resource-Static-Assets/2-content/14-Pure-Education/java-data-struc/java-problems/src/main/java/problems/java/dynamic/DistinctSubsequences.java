package problems.java.dynamic;

public class DistinctSubsequences
{
    /*
    https://leetcode.com/problems/distinct-subsequences/
    Example1:
        Input: s = "rabbbit", t = "rabbit"
        Output: 3
        Explanation:
        As shown below, there are 3 ways you can generate "rabbit" from S.
        rabb bi t
        ra b bbit
        rab b bit
    Example2:
        Input: s = "babgbag", t = "bag"
        Output: 5
        Explanation:
        As shown below, there are 5 ways you can generate "bag" from S.
        ba b g bag
        ba bgba g
        b abgb ag
        ba b gb ag
        babg bag
    */

    static int distinctSubsequences(String s, String t)
    {
        int [][] dp = new int[s.length() + 1][t.length() + 1];
        for(int i = 0; i <= s.length(); ++i)
        {
            dp[i][0] = 1;
        }

        for(int row = 1; row < dp.length; ++row)
        {
            for(int col = 1; col < dp[0].length; ++col)
            {
                if(s.charAt(row - 1) == t.charAt(col - 1))
                {
                    dp[row][col] = dp[row - 1][col - 1] + dp[row - 1][col];
                }
                else
                {
                    dp[row][col] = dp[row - 1][col];
                }
            }
        }
        return dp[s.length()][t.length()];
    }

    static boolean testsPass()
    {
        boolean check = distinctSubsequences("rabbbit", "rabbit") == 3;
        if(!check)
        {
            return false;
        }

        check = distinctSubsequences("babgbag", "bag") == 5;
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
