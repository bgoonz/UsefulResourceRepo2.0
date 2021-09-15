package data.structures.java.strings;

import java.util.Stack;

public class Palindrome
{
  public static boolean isPalindrome(String s)
  {
    char[] ar = s.toCharArray();
    int left = 0, right = ar.length - 1;

    while(left < right)
    {
      if(ar[left++] != ar[right--])
      {
        return false;
      }
    }
    return true;
  }

  public static boolean isPalindromeUsingStack(String s)
  {
    int len = s.length();
    if (len < 2) return true;

    Stack<Character> stack = new Stack<>();
    char[] ar = s.toCharArray();

    int index = 0;
    while(index < len / 2)
    {
      stack.push(ar[index++]);
    }

    if(len % 2 == 1)
    {
      index++;
    }

    while(index < len)
    {
      if(stack.empty())
      {
        return false;
      }
      if(stack.pop() != ar[index++])
      {
        return false;
      }
    }

    return true;
  }

  public static boolean isPalindromeRecursive(String s)
  {
    return Palindrome.isPalindrome(s);
  }

  //  =======================================================================
  //  =======================================================================
  //  =======================================================================
  public static int lengthOfLongestPalindrome(String s)
  {
    int max = 1;
    for(int i = 0; i < s.length(); ++i)
    {
      for(int j = s.length(); j >= i; --j)
      {
        String subStr = s.substring(i, j);
        if(isPalindrome(subStr) &&  subStr.length() > max)
        {
          max = subStr.length();
        }
      }
    }
    return max;
  }

  public static String longestPalindrome(String s)
  {
    String longest = "";
    for(int i = 0; i < s.length(); ++i)
    {
      for(int j = s.length(); j >= i; --j)
      {
        String subStr = s.substring(i, j);
        if(isPalindrome(subStr) &&  subStr.length() > longest.length())
        {
          longest = subStr;
        }
      }
    }
    return longest;
  }


  //  =======================================================================
  //  =======================================================================
  //  =======================================================================
  public static String makeShortestPalindrome(String s)
  {
    // Given a string S,
    // you are allowed to convert it to a palindrome by adding characters in front of it.

    int start = 0;
    int end = s.length() - 1;

    while(start < end)
    {
      if(s.charAt(start) == s.charAt(end))
      {
        start++;
        end--;
      }
      else
      {
        end--;
      }
    }

    if(start == s.length() / 2)
    {
      return s;
    }

    String suffix = s.substring(start + 1);
    String prefix = new StringBuilder(suffix).reverse().toString();
    return prefix + s.charAt(start) + suffix;
  }
}
