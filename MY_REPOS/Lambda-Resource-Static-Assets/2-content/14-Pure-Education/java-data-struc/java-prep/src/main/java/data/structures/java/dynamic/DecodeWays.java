package data.structures.java.dynamic;

import org.apache.commons.lang3.StringUtils;

public class DecodeWays
{
  //  A message containing letters from A-Z is being encoded to numbers using the following mapping:
  //  'A' -> 1, 'B' -> 2, ..., 'Z' -> 26.
  //  Given an encoded message containing digits, determine the total number of ways to decode it.

  private int [] dp;

  public DecodeWays(String s)
  {
    if(StringUtils.isNotBlank(s))
    {
      dp = new int[s.length() + 1];

      dp[0] = 1;
      dp[1] = isValid(s.substring(0, 1)) ? 1 : 0;

      for(int i = 2; i <= s.length(); ++i)
      {
        if(isValid(s.substring(i - 1, i)))
        {
          dp[i] += dp[i - 1];
        }
        if(isValid(s.substring(i - 2, i)))
        {
          dp[i] += dp[i - 2];
        }
      }
    }
  }

  public int numberOfWays()
  {
    return dp[dp.length - 1];
  }

  private boolean isValid(String s)
  {
    if(s.charAt(0) == '0')
    {
      return false;
    }

    int val = Integer.parseInt(s);
    return val >= 1 && val <= 26;
  }
}
