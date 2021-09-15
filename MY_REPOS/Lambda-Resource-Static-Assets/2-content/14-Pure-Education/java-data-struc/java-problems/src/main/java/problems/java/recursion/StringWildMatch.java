package problems.java.recursion;

public class StringWildMatch
{
    static boolean wildMatch(String s, String pattern)
    {
        while(pattern.length() > 0)
        {
            if(pattern.charAt(0) == '?')
            {
                if(s.length() != 0)
                {
                    s = s.substring(1);
                    pattern = pattern.substring(1);
                }
                else
                {
                    return false;
                }
            }
            else if(pattern.charAt(0) == '*')
            {
                if(wildMatch(s, pattern.substring(1)))
                {
                    return true;
                }
                if(s.length() > 0 && (wildMatch(s.substring(1), pattern)))
                {
                    return true;
                }
                return false;
            }
            else
            {
                if(s.length() != 0 && s.charAt(0) == pattern.charAt(0))
                {
                    s = s.substring(1);
                    pattern = pattern.substring(1);
                }
                else
                {
                    return false;
                }
            }
        }


        return s.length() == pattern.length();
    }

    static boolean testsPass()
    {
        boolean check = wildMatch("Good Morning", "*d*");
        if(!check)
        {
            return false;
        }
        check = wildMatch("Good Morning", "*ing");
        if(!check)
        {
            return false;
        }
        check = wildMatch("Good Morning", "Goo*ing");
        if(!check)
        {
            return false;
        }
        check = !wildMatch("Good Morning", "Good *x");
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
