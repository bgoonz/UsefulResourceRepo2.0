package problems.java.strings;

public class PatternMatch
{
    static boolean patternMatch(String s, String pattern)
    {
        int strLen = s.length(), patLen = pattern.length();
        if(strLen < patLen)
        {
            return false;
        }
        if(strLen == patLen)
        {
            return s.equals(pattern);
        }
        for(int i = 0; i < strLen - patLen; ++i)
        {
            if(s.charAt(i) == pattern.charAt(0))
            {
                int j;
                for(j = 0; j < patLen; ++j)
                {
                    if(s.charAt(i + j) != pattern.charAt(j))
                    {
                        break;
                    }
                }
                if(patLen == j)
                {
                    return true;
                }
            }
        }
        return false;
    }

    static boolean subsequenceMatch(String s, String pat)
    {
        //  Following cases will match:
        //  String          Pattern
        //  "abcxdefyzlmn"  "xyz"
        //  "abcxdefxyzlmn" "xyz"

        int patIdx = 0;
        for(int i = 0; i < s.length() &&  patIdx < pat.length(); ++i)
        {
            if(s.charAt(i) == pat.charAt(patIdx))
            {
                if(++patIdx == pat.length())
                {
                    return true;
                }
            }
        }
        return false;
    }

    static boolean testsPass()
    {
        String test = "Hello world", pat1 = "o wo", pat2 = "owo";
        boolean check = patternMatch(test, pat1);
        if(!check)
        {
            return false;
        }
        check = patternMatch(test, pat2);
        if(check)
        {
            return false;
        }
        check = subsequenceMatch("abcxdefyzlmn", "xyz");
        if(!check)
        {
            return false;
        }
        check = subsequenceMatch("abcxdefxyzlmn", "xyz");
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
