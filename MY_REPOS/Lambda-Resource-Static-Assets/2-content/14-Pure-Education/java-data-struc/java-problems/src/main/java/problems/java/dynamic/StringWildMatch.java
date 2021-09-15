package problems.java.dynamic;

public class StringWildMatch
{
    /*
    "Goody", "*d*"
    ---------------------
       0 1 2 3              0 1 2 3
    ----------           ----------
    0| T T F F           0| T T F F
    1| F                 1| F T F F
    2| F                 2| F T F F
    3| F                 3| F T F F
    4| F                 4| F T T T
    5| F                 5| F T F T
    */

    static boolean wildMatch(String str, String pat)
    {
        int strLen = str.length(), patLen = pat.length();

        boolean[][] dp = new boolean[strLen + 1][patLen + 1];
        dp[0][0] = true;
        for(int i = 1; i <= patLen; ++i)
        {
            if(pat.charAt(i - 1) == '*')
            {
                dp[0][i] = dp[0][i - 1];
            }
        }

        for(int i = 1; i <= strLen; ++i)
        {
            for(int j = 1; j <= patLen; ++j)
            {
                if(pat.charAt(j - 1) == '*')
                {
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                }
                else
                {
                    if(pat.charAt(j - 1) == '?' || str.charAt(i - 1) == pat.charAt(j - 1))
                    {
                        dp[i][j] = dp[i - 1][j - 1];
                    }
                }
            }
        }
        return dp[strLen][patLen];
    }

    static boolean testsPass()
    {
        boolean check = wildMatch("Goody", "*d*");
        if(!check)
        {
            return false;
        }
        check = wildMatch("Good Morning", "*ing");
        if(!check)
        {
            return false;
        }
        check = wildMatch("Good Morning", "Goo*ing");
        if(!check)
        {
            return false;
        }
        check = !wildMatch("Good Morning", "Good *x");
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
