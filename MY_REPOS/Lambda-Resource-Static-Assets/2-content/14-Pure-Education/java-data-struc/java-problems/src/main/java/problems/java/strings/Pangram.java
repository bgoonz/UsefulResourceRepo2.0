package problems.java.strings;

import java.util.HashSet;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Collectors;

public class Pangram
{
//    The sentence "The quick brown fox jumps over the lazy dog" contains
//    every single letter in the alphabet. Such sentences are called pangrams.
//    Write a function findMissingLetters, which takes a String `sentence`,
//    and returns all the letters it is missing (which prevent it from being a pangram).

    private static String ALPHABET = "abcdefghijklmnopqrstuvwxyz";

    static String missingLetters(String s)
    {
        Set<Character> set = new HashSet<>(ALPHABET.chars().mapToObj(c -> (char)c).collect(Collectors.toSet()));
        return set.stream().filter(c -> s.indexOf(c) == -1).map(String::valueOf).collect(Collectors.joining());
    }

    static boolean testsPass()
    {
        boolean check = "".equals(missingLetters("The quick brown fox jumps over the lazy dog")) &&
                "abcdefghijklmnopqrstuvwxyz".equals(missingLetters(""));
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
