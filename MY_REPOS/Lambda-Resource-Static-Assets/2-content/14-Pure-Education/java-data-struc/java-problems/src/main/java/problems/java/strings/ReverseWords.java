package problems.java.strings;

import java.util.Arrays;
import java.util.stream.Collectors;

import static problems.java.common.Common.reverse;

public class ReverseWords
{
    static String reverseWords(String sentence)
    {
        //  1. "one two three" ->  "eerht owt eno"
        //  2. "eerht owt eno" ->  "eno owt eerht"

        StringBuilder sb = new StringBuilder(sentence);
        String reversed = sb.reverse().toString();
        String[] parts = reversed.split("\\s+");
        reverse(parts);
        return Arrays.stream(parts).collect(Collectors.joining(" "));
    }

    static String reverseWordsBruteForce(String sentence)
    {
        StringBuilder sb = new StringBuilder();
        String[] a = sentence.split("\\s+");
        for(String s : a)
        {
            Character[] chars = s.chars().mapToObj(c -> (char)c).toArray(Character[]::new);
            reverse(chars);
            String reversedWord = Arrays.stream(chars).map(String::valueOf).collect(Collectors.joining());
            sb.append(reversedWord).append(" ");
        }

        return sb.toString().trim();
    }

    static boolean testsPass()
    {
        String s = "one two three";
        boolean check = reverseWordsBruteForce(s).equals("eno owt eerht");
        if(!check)
        {
            return false;
        }

        check = reverseWords(s).equals("eno owt eerht");
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
