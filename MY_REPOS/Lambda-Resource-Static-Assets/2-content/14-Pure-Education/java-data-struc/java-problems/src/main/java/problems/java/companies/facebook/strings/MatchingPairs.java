package problems.java.companies.facebook.strings;


public class MatchingPairs
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=559324704673058

    Given two strings s and t of length N, find the maximum number of possible matching pairs in strings s and t
    after swapping exactly two characters within s (i.e. single swap)
    The matching pairs of the two strings are defined as the number of indices for which s[i] and t[i] are equal.
    Example:                Example:
        s = "abcd"              s = "mno"
        t = "adcb"              t = "mno"
        output = 4              output = 1

    Assume strings s and t contain at least 2 characters
    */

    static int matchingPairs(String s, String t)
    {
        boolean swapped = false;
        for(int i = 0; i < s.length(); ++i)
        {
            if(s.charAt(i) != t.charAt(i))
            {
                int idx = t.indexOf(s.charAt(i));
                {
                    if(idx != -1)
                    {
                        t = swap(t, i, idx);
                        swapped = true;
                        break;
                    }
                }
            }
        }

        if(!swapped)
        {
            t = swap(t, 0, 1);
        }

        int count = 0;
        for(int i = 0; i < s.length(); ++i)
        {
            count += s.charAt(i) == t.charAt(i) ? 1 : 0;
        }
        return count;
    }

    static private String swap(String s, int idx1, int idx2)
    {
        char[] a = s.toCharArray();
        char temp = a[idx1];
        a[idx1] = a[idx2];
        a[idx2] = temp;
        return new String(a);
    }

    static boolean testsPass()
    {
        boolean check = matchingPairs("abcd", "adcb") == 4;
        if(!check)
        {
            return false;
        }
        check = matchingPairs("mno", "mno") == 1;
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
