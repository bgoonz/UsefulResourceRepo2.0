package problems.java.strings;

public class Palindrome
{
    static boolean isPalindrome(String s)
    {
        int left = 0, right = s.length() - 1;

        while(left < right)
        {
            if(s.charAt(left) != s.charAt(right))
            {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    static int lengthOfLongestPalindrome(String s)
    {
        int max = Integer.MIN_VALUE;

        for(int i = 0; i < s.length(); ++i)
        {
            for(int j = s.length(); j > i; j--)
            {
                String subStr = s.substring(i, j);
                if(isPalindrome(subStr) && subStr.length() > max)
                {
                    max = subStr.length();
                }
            }
        }
        return max;
    }

    static String longestPalindrome(String s)
    {
        String longest = "";
        int max = Integer.MIN_VALUE;

        for(int i = 0; i < s.length(); ++i)
        {
            for(int j = s.length(); j > i; j--)
            {
                String subStr = s.substring(i, j);
                if(isPalindrome(subStr) && subStr.length() > max)
                {
                    max = subStr.length();
                    longest = subStr;
                }
            }
        }
        return longest;
    }

    static String makeShortestPalindrome(String s)
    {
        //  Consider string "abcd"
        //  Shortest palindrome would be "dcbabcd"
        //  Where:
            //  "bcd" is the suffix
            //  "dcb" is the prefix (reverse of the suffix)
            //  and "a" is the character at the left position

        int left = 0, right = s.length() - 1;
        while(left < right)
        {
            if(s.charAt(left) == s.charAt(right))
            {
                left++;
                right--;
            }
            else
            {
                right--;
            }
        }

        if(left == s.length() / 2)
        {
            return s;
        }

        String suffix = s.substring(left + 1);
        String prefix = new StringBuilder(suffix).reverse().toString();
        return prefix + s.charAt(left) + suffix;
    }

    static boolean testsPass()
    {
        String s1 = "abcddcba", s2 = "abcdcba", s3 = "abcdba";
        boolean check = isPalindrome(s1);
        if(!check)
        {
            return false;
        }
        check = isPalindrome(s2);
        if(!check)
        {
            return false;
        }
        check = isPalindrome(s3);
        if(check)
        {
            return false;
        }
        check = lengthOfLongestPalindrome("dfrabcdedcbaprewsg") == 9;
        if(!check)
        {
            return false;
        }
        check = longestPalindrome("dfrabcdedcbaprewsg").equals("abcdedcba");
        if(!check)
        {
            return false;
        }
        check = makeShortestPalindrome("cdcba").equals("abcdcba");
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
