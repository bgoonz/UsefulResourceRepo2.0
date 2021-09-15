package problems.java.recursion;

public class Palindrome
{
    static boolean stringPalindrome(String s)
    {
        if(s.length() < 2)
        {
            return true;
        }

        if(s.charAt(0) != s.charAt(s.length() -1))
        {
            return false;
        }
        return stringPalindrome(s.substring(1, s.length() - 1));
    }


    static boolean testsPass()
    {
        String s1 = "abcddcba", s2 = "abcdcba", s3 = "abcdba";
        boolean check = stringPalindrome(s1) && stringPalindrome(s2) && !stringPalindrome(s3);
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
