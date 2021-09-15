package problems.java.strings;

import org.apache.commons.lang3.tuple.Pair;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Longest
{
    static int[] longestUniformSubstring(String s)
    {
        //  for the input: "abbbccda" the longest uniform substring is "bbb"
        char lastChar = s.charAt(0);
        int count = 1, start = 0, max = 1;
        for(int i = 1; i < s.length(); ++i)
        {
            if(s.charAt(i) == lastChar)
            {
                count++;
            }
            else
            {
                if(count > max)
                {
                    max = count;
                    start = i - count;
                }
                count = 1;
                lastChar = s.charAt(i);
            }
        }

        if(count > max)
        {
            return new int[] {s.length() - count, count};
        }
        return new int[] {start, max};
    }

    static String longestWordWithAllLetters(String letters, String[] dictionary)
    {
        int max = 0;
        String longest = "";
        for(String s : dictionary)
        {
            boolean check = true;
            for(char c : s.toCharArray())
            {
                if(letters.indexOf(c) == -1)
                {
                    check = false;
                    break;
                }
            }
            if(check && s.length() > max)
            {
                max = s.length();
                longest = s;
            }
        }
        return longest;
    }

    static String longestWordWithAllLettersWithStreams(String letters, String[] dictionary)
    {
        Map<Boolean, List<String>> map = Arrays.stream(dictionary)
                .collect(Collectors.partitioningBy(s -> s.chars().allMatch(c -> letters.indexOf(c) != -1)));

        Pair<String,Integer> longestPair = map.get(true).stream()
                .map(s -> Pair.of(s, s.length())).max(Comparator.comparing(Pair::getRight)).get();
        return longestPair.getLeft();
    }

    static String longestCommonString(String s1, String s2)
    {
        //  Strings: "abxcxyze" and "jxyzkl" have "xyz" in common.
        int max = Integer.MIN_VALUE;
        String longest = "";
        for(int i = 0; i < s1.length(); ++i)
        {
            int index = s2.indexOf(s1.charAt(i));
            if(index != -1)
            {
                int count = 0;
                while(i + count < s1.length() && index + count < s2.length() &&
                        s1.charAt(i + count) == s2.charAt(index + count))
                {
                    count++;
                }
                if (count > max)
                {
                    max = count;
                    longest = s1.substring(i, i + count);
                }
            }
        }
        return longest;
    }


    static boolean testsPass()
    {
        boolean check = Arrays.equals(new int[] {1, 3}, longestUniformSubstring("abbbccda")) &&
                Arrays.equals(new int[] {29, 8},
                        longestUniformSubstring("1000011010101110110100010010011111111"));
        if(!check)
        {
            return false;
        }

        check = longestWordWithAllLetters("oet",
                new String[] {"to", "toe", "tooeet", "toes"}).equals("tooeet");
        if(!check)
        {
            return false;
        }
        check = longestWordWithAllLettersWithStreams("oet",
                new String[] {"to", "toe", "tooeet", "toes"}).equals("tooeet");
        if(!check)
        {
            return false;
        }

        check = longestCommonString("abxcxyze", "jxyzkl").equals("xyz");
        if(!check)
        {
            return false;
        }

        check = longestCommonString("abcdefwxyz", "klmnwxyz").equals("wxyz");
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
