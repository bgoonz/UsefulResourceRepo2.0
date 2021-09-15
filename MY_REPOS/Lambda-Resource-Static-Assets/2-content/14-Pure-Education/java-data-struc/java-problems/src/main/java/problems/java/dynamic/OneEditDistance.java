package problems.java.dynamic;

public class OneEditDistance
{
    //  Given two string s1 and s2, find if s1 can be converted
    //  to s2 with exactly one edit.
    //  Input:    Result
    //  s1 = "book", s2 = "books":   yes
    //  s1 = "book" s2 = "cook":    yes
    //  s1 = "fact" s2 = "fat"      yes

    static boolean oneEditDistance(String s1, String s2)
    {
        int len1 = s1.length(), len2 = s2.length();
        if(Math.abs(len1 - len2) > 1)
        {
            return false;
        }

        int count = 0, s1Pos = 0, s2Pos = 0;
        while(s1Pos < len1 && s2Pos < len2)
        {
            if(s1.charAt(s1Pos) == s2.charAt(s2Pos))
            {
                s1Pos++;
                s2Pos++;
            }
            else
            {
                if(count == 1)
                {
                    return false;
                }
                if(len1 > len2)
                {
                    s1Pos++;
                }
                else if(len1 < len2)
                {
                    s2Pos++;
                }
                else
                {
                    s1Pos++;
                    s2Pos++;
                }
                count++;
            }
        }
        if(s1Pos < len1 || s2Pos < len2)
        {
            count++;
        }
        return count == 1;
    }

    static boolean testsPass()
    {
        String s1 = "book", s2 = "books";
        String s3 = "book", s4 = "cook";
        String s5 = "fact", s6 = "fat";
        boolean check = oneEditDistance(s1, s2) &&
                oneEditDistance(s3, s4) && oneEditDistance(s5, s6);
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
