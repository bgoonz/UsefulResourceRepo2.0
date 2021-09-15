package data.structures.java.dynamic;

public class WildcardMatch
{
  public static boolean wildcardMatch(String str, String pattern)
  {
    int strLen = str.length();
    int patLength = pattern.length();

    boolean[][] dp = new boolean[strLen + 1][patLength + 1];

    dp[0][0] = true;

    //  init top row
    for(int i = 1; i <= patLength; ++i)
    {
      if(pattern.charAt(i - 1) == '*')
      {
        dp[0][i] = dp[0][i - 1];
      }
    }

    for(int i = 1; i <= strLen; ++i)
    {
      for(int j = 1; j <= patLength; ++j)
      {
        if(pattern.charAt(j - 1) == '*')
        {
          dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
        }
        else
        {
          if(pattern.charAt(j - 1) == '?' || str.charAt(i - 1) == pattern.charAt(j - 1))
          {
            dp[i][j] = dp[i - 1][j - 1];
          }
        }
      }
    }

    return dp[strLen][patLength];
  }

  public static boolean wildcardMatchRecursive(String str, String pattern)
  {
    return data.structures.java.recursion.WildcardMatch.wildcardMatch(str, pattern);
  }
}
