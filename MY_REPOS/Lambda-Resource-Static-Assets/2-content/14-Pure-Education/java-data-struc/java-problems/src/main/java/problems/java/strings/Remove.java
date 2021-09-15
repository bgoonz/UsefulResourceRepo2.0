package problems.java.strings;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public class Remove
{
    static String removeChars(String s, String remove)
    {
        Set<Character> removeSet = remove.chars().mapToObj(e -> (char)e).collect(Collectors.toSet());
        char[] a = s.toCharArray();
        int pos = 0;
        for(char c : a)
        {
            if(!removeSet.contains(c))
            {
                a[pos++] = c;
            }
        }
        return new String(a, 0, pos);
    }

    static String removeCharsWithStreams(String s, String remove)
    {
        return s.chars().mapToObj(x -> (char)x)
                .filter(c -> remove.indexOf(c) == -1)
                .map(String::valueOf)
                .collect(Collectors.joining());
    }

    static String[] removeStringFromArrayWithStreams(String[] input, String value)
    {
        return Arrays.stream(input).filter(x -> !x.equals(value)).toArray(String[]::new);
    }

    static String removeDups(String s)
    {
        char[] a = s.toCharArray();

        int pos = 1;
        for(int i = 1; i < a.length; ++i)
        {
            int j;
            for(j = 0; j < pos; ++j)
            {
                if(a[i] == a[j])
                {
                    break;
                }
            }
            if(j == pos)
            {
                a[pos++] = a[i];
            }
        }

        return new String(a, 0, pos);
    }

    static String removeDupsWithStreams(String s)
    {
        return s.chars().mapToObj(c -> (char)c).distinct().map(String::valueOf).collect(Collectors.joining());
    }

    static String removeAdjacentDups(String s)
    {
        char[] a = s.toCharArray();

        int pos = 1;
        for(int i = 1; i < a.length; ++i)
        {
            if(a[i] != a[i - 1])
            {
                a[pos++] = a[i];
            }
        }

        return new String(a, 0, pos);
    }


    static boolean testsPass()
    {
        String s = "Kill all vowels";
        String remove = "aeiou ";
        String result = removeChars(s,remove);
        boolean check = result.equals("Kllllvwls");
        if(!check)
        {
            return false;
        }
        result = removeCharsWithStreams(s,remove);
        check = result.equals("Kllllvwls");
        if(!check)
        {
            return false;
        }
        String [] input = {"a", "b", "c", "d", "e", "f", "g", "h", "i"};
        String[] output = removeStringFromArrayWithStreams(input, "e");
        check = Arrays.equals(output, new String[] {"a", "b", "c", "d", "f", "g", "h", "i"});
        if(!check)
        {
            return false;
        }
        check = removeDups("abcdacbdabcd").equals("abcd");
        if(!check)
        {
            return false;
        }
        check = removeDupsWithStreams("abcdacbdabcd").equals("abcd");
        if(!check)
        {
            return false;
        }
        check = removeAdjacentDups("aaabbbbcccb").equals("abcb");
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
