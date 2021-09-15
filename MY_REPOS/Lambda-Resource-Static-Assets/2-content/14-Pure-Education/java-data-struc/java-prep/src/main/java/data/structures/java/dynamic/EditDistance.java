package data.structures.java.dynamic;

public class EditDistance
{
  //  Find the cost of converting one string to another.
  /*
  Consider two strings:
  s1 = "saturday", s2 = "sunday"
  Initial state of the dp array
          s u n d a y
      0 | 1 2 3 4 5 6
      -----------------
   s  1 | 0 1 2 3 4 5
   a  2 | 1 1 2 3 3 4
   t  3 | 2 2 2 3 4 4
   u  4 | 3 2 3 3 4 5
   r  5 | 4 3 3 4 4 5
   d  6 | 5 4 4 3 4 5
   a  7 | 6 5 5 4 3 4
   y  8 | 7 6 6 5 4 3
   */

  private static int min(int a, int b, int c)
  {
    return Math.min(Math.min(a, b), c);
  }

  private static int editDistance(String s1, String s2, int len1, int len2)
  {
    int [][] dp = new int[len1 + 1][len2 + 1];

    //  initialize first row and column
    for(int i = 1; i <= len2; ++i)
    {
      dp[0][i] = i;
    }
    for(int i = 1; i <= len1; ++i)
    {
      dp[i][0] = i;
    }

    for(int i = 1; i <= len1; ++i)
    {
      for(int j = 1; j <= len2; ++j)
      {
        if(s1.charAt(i - 1) == s2.charAt(j - 1))
        {
          dp[i][j] = dp[i - 1][j - 1];
        }
        else
        {
          dp[i][j] = 1 + min(
              dp[i][j - 1],
              dp[i - 1][j],
              dp[i - 1][j - 1]);
        }
      }
    }

    return dp[len1][len2];
  }

  public static int editDistance(String s1, String s2)
  {
    return editDistance(s1, s2, s1.length(), s2.length());
  }

  public static int recursiveEditDistance(String s1, String s2)
  {
    return data.structures.java.recursion.EditDistance.editDistance(s1, s2);
  }
}
