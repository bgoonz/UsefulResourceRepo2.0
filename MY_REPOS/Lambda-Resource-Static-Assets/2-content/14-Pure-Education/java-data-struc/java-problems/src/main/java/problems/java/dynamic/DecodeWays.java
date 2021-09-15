package problems.java.dynamic;

public class DecodeWays
{
    //  A message containing letters from A-Z is being encoded to numbers using the following mapping:
    //  'A' -> 1, 'B' -> 2, ..., 'Z' -> 26.
    //  Given an encoded message containing digits, determine the total number of ways to decode it.
    static int decodeWays(String s)
    {
        int[] dp = new int[s.length() + 1];
        dp[0] = 1;
        dp[1] = isValid(s.substring(0, 1)) ? 1 : 0;
        for(int i = 2; i <= s.length(); ++i)
        {
            if(isValid(s.substring(i - 1, i)))
            {
                dp[i] = dp[i - 1];
            }
            if(isValid(s.substring(i - 2, i)))
            {
                dp[i] += dp[i - 2];
            }
        }
        return dp[s.length()];
    }

    private static boolean isValid(String s)
    {
        if(s.charAt(0) == '0')
        {
            return false;
        }
        int val = Integer.parseInt(s);
        return val >= 1 && val <= 26;
    }

    static boolean testsPass()
    {
        boolean check = decodeWays("2122") == 5;
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
