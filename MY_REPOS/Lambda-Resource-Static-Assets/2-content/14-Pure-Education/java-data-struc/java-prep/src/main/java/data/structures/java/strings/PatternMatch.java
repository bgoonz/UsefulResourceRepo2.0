package data.structures.java.strings;

public class PatternMatch
{
  public static boolean patternMatch(String str, String pat)
  {
    int strLen = str.length(), patLen = pat.length();

    for(int i = 0; i < strLen - patLen; ++i)
    {
      if(str.charAt(i) == pat.charAt(0))
      {
        int j;
        for(j = 0; j < patLen; ++j)
        {
          if(str.charAt(i + j) != pat.charAt(j))
          {
            break;
          }
        }
        if(j == patLen)
        {
          return true;
        }
      }
    }

    return false;
  }

  public static boolean subsequenceMatch(String str, String pat)
  {
    //  Note: this function is different from patternMatch
    //  this function will match: "abcxdefyzlmn", "xyz" and "abcxdefxyzlmn", "xyz"
    int patIdx = 0;
    for(int strIdx = 0; strIdx < str.length() && patIdx < pat.length(); ++strIdx)
    {
      if(str.charAt(strIdx) == pat.charAt(patIdx))
      {
        patIdx++;
      }
    }

    return patIdx == pat.length();
  }
}
