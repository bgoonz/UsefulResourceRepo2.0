package problems.java.dynamic;


public class RestoreArray
{
    /*
    https://leetcode.com/problems/restore-the-array/
    A program was supposed to print an array of integers.
    The program forgot to print whitespaces and the array is printed as a string of digits
    and all we know is that all integers in the array were in the range [1, k]
    and there are no leading zeros in the array.
    Given the string s and the integer k. There can be multiple ways to restore the array.
    Return the number of possible array that can be printed as a string s using the mentioned program.
    Example 1:
        Input: s = "1317", k = 2000
        Output: 8
        Possible arrays are [1317],[131,7],[13,17],[1,317],[13,1,7],[1,31,7],[1,3,17],[1,3,1,7]
    Example 2:
        Input: s = "1307", k = 2000
        Output: 4
        Possible arrays are [1307],[1,307],[130,7],[1,30,7]
    Example 3:
        Input: s = "2020", k = 30
        Output: 1
        The only possible array is [20,20]. [2020] is invalid because 2020 > 30.
        [2,020] is ivalid because 020 contains leading zeros.
    */

    static int numberWaysToRestoreArray(String s, int maxVal)
    {
        int len = s.length();
        int[] dp = new int[s.length() + 1];
        dp[len] = 1;

        for(int i = len - 1; i >= 0; --i)
        {
            if(s.charAt(i) == '0')
            {
                continue;
            }
            int num = 0;
            for(int j = i + 1; j <= len; ++j)
            {
                num = num * 10 + s.charAt(j - 1) - '0';
                if(num > maxVal)
                {
                    break;
                }
                dp[i] += dp[j];
            }
        }
        return dp[0];
    }

    static boolean testsPass()
    {
        boolean check = numberWaysToRestoreArray("1317", 2000) == 8;
        if(!check)
        {
            return false;
        }

        check = numberWaysToRestoreArray("1307", 2000) == 3;
        if(!check)
        {
            return false;
        }

        check = numberWaysToRestoreArray("2020", 30) == 1;
        if(!check)
        {
            return false;
        }

        check = numberWaysToRestoreArray("1000", 10) == 0;
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
