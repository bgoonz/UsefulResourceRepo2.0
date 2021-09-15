package problems.java.recursion;

import static problems.java.common.Common.min3;

public class EditDistance
{
    static int editDistance(String s1, String s2)
    {
        return editDistance(s1, s2, s1.length(), s2.length());
    }

    private static int editDistance(String s1, String  s2, int len1, int len2)
    {
        if(len1 == 0)
        {
            return len2;
        }
        if(len2 == 0)
        {
            return len1;
        }

        if(s1.charAt(len1 - 1) == s2.charAt(len2 - 1))
        {
            return editDistance(s1, s2, len1 - 1, len2 - 1);
        }
        else
        {
            int d1 = editDistance(s1, s2, len1, len2 - 1);
            int d2 = editDistance(s1, s2, len1 - 1, len2);
            int d3 = editDistance(s1, s2, len1 - 1, len2 - 1);
            return 1 + min3(d1, d2, d3);
        }
    }

    static boolean testsPass()
    {
        String s1 = "sunday";
        String s2 = "saturday";
        boolean check = editDistance(s1, s2) == 3;
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
