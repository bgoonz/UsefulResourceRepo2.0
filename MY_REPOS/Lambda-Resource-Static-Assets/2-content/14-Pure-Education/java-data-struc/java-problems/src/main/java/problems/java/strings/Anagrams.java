package problems.java.strings;

import java.util.*;
import java.util.stream.Collectors;

import static problems.java.common.Common.sortString;

public class Anagrams
{
    static boolean isAnagram(String s1, String s2)
    {
        if(s1.length() != s2.length())
        {
            return false;
        }

        int[] check = new int[256];

        for(char c : s1.toCharArray())
        {
            check[c]++;
        }

        for(char c : s2.toCharArray())
        {
            if(--check[c] < 0)
            {
                return false;
            }
        }

        return true;
    }

    static boolean isAnagramWithSort(String s1, String s2)
    {
        if(s1.length() != s2.length())
        {
            return false;
        }

        char[] a1 = s1.toCharArray();
        char[] a2 = s2.toCharArray();
        Arrays.sort(a1);
        Arrays.sort(a2);
        return Arrays.equals(a1, a2);
    }

    static Map<String, Set<String>> groupAnagrams(String[] a)
    {
        Map<String,Set<String>> result = new HashMap<>();

        for(String s : a)
        {
            String sorted = sortString(s);
            result.computeIfAbsent(sorted, x -> new HashSet<>()).add(s);
        }

        return result;
    }

    static Map<String, Set<String>> groupAnagramsWithStreams(String[] a)
    {
        return Arrays.stream(a).collect(
                Collectors.groupingBy(x -> sortString(x), Collectors.toSet()));
    }

    static boolean testsPass()
    {
        String s1 = "abcdefg", s2 = "gafbedc", s3 = "abcgfee";
        boolean check = isAnagram(s1, s2);
        if(!check)
        {
            return false;
        }
        check = isAnagram(s1, s3);
        if(check)
        {
            return false;
        }
        check = isAnagramWithSort(s1, s2);
        if(!check)
        {
            return false;
        }
        check = isAnagramWithSort(s1, s3);
        if(check)
        {
            return false;
        }
        String[] strs = {"abc", "acb", "bca", "xyz", "zyx", "yxz"};
        Map<String, Set<String>> anagrams = groupAnagrams(strs);
        Set<String> s = anagrams.get("abc");
        if(s.size() != 3 || !(s.contains("abc") && s.contains("acb") && s.contains("bca")))
        {
            return false;
        }
        s = anagrams.get("xyz");
        if(s.size() != 3 || !(s.contains("xyz") && s.contains("zyx") && s.contains("yxz")))
        {
            return false;
        }
        anagrams = groupAnagramsWithStreams(strs);
        s = anagrams.get("abc");
        if(s.size() != 3 || !(s.contains("abc") && s.contains("acb") && s.contains("bca")))
        {
            return false;
        }
        s = anagrams.get("xyz");
        if(s.size() != 3 || !(s.contains("xyz") && s.contains("zyx") && s.contains("yxz")))
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
