package problems.java.companies.facebook.recursion;

public class EncryptedWords
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=223547538732703

    When you encrypt a string S, you start with an initially-empty resulting string R and append characters to it as follows:
    Append the middle character of S (if S has even length, then we define the middle character as the left-most of the two central characters)
    Append the encrypted version of the substring of S that's to the left of the middle character (if non-empty)
    Append the encrypted version of the substring of S that's to the right of the middle character (if non-empty)

    For example, to encrypt the string "abc", we first take "b", and then append the encrypted version of "a" (which is just "a")
    and the encrypted version of "c" (which is just "c") to get "bac".
    If we encrypt "abcxcba" we'll get "xbacbca". That is, we take "x" and then append the encrypted version "abc" and then append the encrypted version of "cba".

    Example 1       Example 2       Example 3       Example 4
    S = "abc"       S = "abcd"      S = "abcxcba"   S = "facebook"
    R = "bac"       R = "bacd"      R = "xbacbca"   R = "eafcobok"
    */

    static String findEncryptedWord(String s)
    {
        if(s.length() == 0)
        {
            return "";
        }
        if(s.length() < 3)
        {
            return s;
        }

        int mid = s.length() / 2;
        if(s.length() % 2 == 0)
        {
            mid--;
        }
        char midChar = s.charAt(mid);
        String left = s.substring(0, mid);
        String right = s.substring(mid + 1);
        return midChar + findEncryptedWord(left) + findEncryptedWord(right);
    }

    static boolean testsPass()
    {
        boolean check = findEncryptedWord("abc").equals("bac");
        if(!check)
        {
            return false;
        }

        check = findEncryptedWord("abcd").equals("bacd");
        if(!check)
        {
            return false;
        }

        check = findEncryptedWord("abcxcba").equals("xbacbca");
        if(!check)
        {
            return false;
        }

        check = findEncryptedWord("facebook").equals("eafcobok");
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
