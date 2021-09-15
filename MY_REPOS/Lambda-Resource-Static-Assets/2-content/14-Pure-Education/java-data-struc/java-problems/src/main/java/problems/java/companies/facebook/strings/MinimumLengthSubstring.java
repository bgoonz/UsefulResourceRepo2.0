package problems.java.companies.facebook.strings;

public class MinimumLengthSubstring
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=2237975393164055

    You are given two strings s and t.
    You can select any substring of string s and rearrange the characters of the selected substring.
    Determine the minimum length of the substring of s such that string t is a substring of the selected substring.
    Example                     Example
        s = "dcbefebce"             s = "dcbefedfe"
        t = "fd"                    t = "fd"'
        output = 5                  output = 2
    Substring "dcbef" can be rearranged to "cfdeb", "cefdb", and so on. String t is a substring of "cfdeb". Thus, the minimum length required is 5.

    */

    static int minLengthSubstring(String s, String t)
    {
        int patIdx = 0, start = Integer.MIN_VALUE, end = Integer.MIN_VALUE;
        int min = Integer.MAX_VALUE;

        for(int i = 0; i < s.length(); ++i)
        {
            if(t.indexOf(s.charAt(i)) != -1)
            {
                if(patIdx == 0)
                {
                    start = i;
                }
                patIdx++;
                if(patIdx == t.length())
                {
                    end = i;
                }
            }

            if(start != Integer.MIN_VALUE && end != Integer.MIN_VALUE)
            {
                min = Math.min(min, end - start);
                start = Integer.MIN_VALUE; end = Integer.MIN_VALUE;
                patIdx = 0;
            }
        }

        return min == Integer.MAX_VALUE ? -1 : min + 1;
    }

    static boolean testsPass()
    {
        boolean check = minLengthSubstring("dcbefebce", "fd") == 5;
        if(!check)
        {
            return false;
        }

        check = minLengthSubstring("dcbefedfe", "fd") == 2;
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
