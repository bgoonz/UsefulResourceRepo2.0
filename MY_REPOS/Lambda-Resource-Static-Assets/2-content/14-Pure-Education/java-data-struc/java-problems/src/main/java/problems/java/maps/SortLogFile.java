package problems.java.maps;

import java.util.*;

public class SortLogFile
{
    /*
    Message is preceded by ID.
    Messages containing text should come before messages containing all numbers
    If two messages are same, they should be ordered by their ID
    Unsorted                    Sorted
    --------                    ------
    "A3 one two three";         "A2 hello world";
    "A2 hello world";           "A4 hello world";
    "B2 3 5 8 12";              "A1 one two three";
    "A1 one two three";         "A3 one two three";
    "B1 5 2 19";                "B2 3 5 8 12";
    "A4 hello world";           "B1 5 2 19";
    */

    static List<String> sortMessages(String[] messages)
    {
        Map<String, SortedSet<String>> stringMessageMap = new TreeMap<>();
        Map<String, SortedSet<String>> numberMessageMap = new TreeMap<>();
        for(String s : messages)
        {
            String[] a = s.split("\\s+");
            String id = a[0];
            String message = s.substring(id.length()).trim();
            if(message.matches("^[\\d ]*$"))
            {
                numberMessageMap.computeIfAbsent(message, x -> new TreeSet<>()).add(id);
            }
            else
            {
                stringMessageMap.computeIfAbsent(message, x -> new TreeSet<>()).add(id);
            }
        }

        List<String> result = new ArrayList<>();
        for(String message : stringMessageMap.keySet())
        {
            SortedSet<String> ids = stringMessageMap.get(message);
            for(String id : ids)
            {
                result.add(id + " " + message);
            }
        }
        for(String message : numberMessageMap.keySet())
        {
            SortedSet<String> ids = numberMessageMap.get(message);
            for(String id : ids)
            {
                result.add(id + " " + message);
            }
        }
        return result;
    }

    static boolean testsPass()
    {
        String [] data = new String[] {
                "A3 one two three",
                "A2 hello world",
                "B2 3 5 8 12",
                "A1 one two three",
                "B1 5 2 19",
                "A4 hello world"
        };
        List<String> sorted = sortMessages(data);
        boolean check = sorted.get(0).equals("A2 hello world") &&
                sorted.get(1).equals("A4 hello world") &&
                sorted.get(2).equals("A1 one two three") &&
                sorted.get(3).equals("A3 one two three") &&
                sorted.get(4).equals("B2 3 5 8 12") &&
                sorted.get(5).equals("B1 5 2 19");
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
