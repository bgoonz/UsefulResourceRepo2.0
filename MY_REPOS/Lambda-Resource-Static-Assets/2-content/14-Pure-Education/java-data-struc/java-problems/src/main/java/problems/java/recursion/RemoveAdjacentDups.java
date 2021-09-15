package problems.java.recursion;

public class RemoveAdjacentDups
{
    static String removeAdjacentDups(String s)
    {
        if(s.length() == 1)
        {
            return s;
        }

        if(s.charAt(0) == s.charAt(1))
        {
            return removeAdjacentDups(s.substring(1));
        }
        else
        {
            return s.charAt(0) + removeAdjacentDups(s.substring(1));
        }

    }

    static boolean testsPass()
    {
        boolean check = removeAdjacentDups("aaabbbbcccb").equals("abcb");
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
