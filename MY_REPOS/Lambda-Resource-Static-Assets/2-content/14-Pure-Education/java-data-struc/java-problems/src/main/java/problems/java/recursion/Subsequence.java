package problems.java.recursion;

public class Subsequence
{
    static String longestSubsequence(String s1, String s2)
    {
        return longestSubsequence(s1.toCharArray(), s2.toCharArray(), s1.length(), s2.length());
    }

    static private String longestSubsequence(char[] a1, char[] a2, int len1, int len2)
    {
        if(len1 == 0 || len2 == 0)
        {
            return "";
        }

        if(a1[len1 - 1] == a2[len2 - 1])
        {
            return longestSubsequence(a1, a2, len1 - 1, len2 - 1) + a1[len1 - 1];
        }
        else
        {
            String s1 = longestSubsequence(a1, a2, len1 - 1, len2);
            String s2 = longestSubsequence(a1, a2, len1, len2 - 1);
            return s1.length() > s2.length() ? s1 : s2;
        }
    }

    static boolean testsPass()
    {
        String s1 = "abcdefg", s2 = "acefxyz";
        boolean check = longestSubsequence(s1, s2).equals("acef");
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
