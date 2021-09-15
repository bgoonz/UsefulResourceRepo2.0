package problems.java.recursion;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class PowerSet
{
    static List<List<Character>> generate(String s)
    {
        List<Character> chars = s.chars().mapToObj(c -> (char)c).collect(Collectors.toList());
        return generate(chars);
    }

    private static List<List<Character>> generate(List<Character> input)
    {
        List<List<Character>> result = new ArrayList<>();
        if(input.isEmpty())
        {
            result.add(new ArrayList<>());
            return result;
        }

        char first = input.get(0);
        List<Character> rem = input.subList(1, input.size());

        for(List<Character> sub : generate(rem))
        {
            List<Character> list = new ArrayList<>();
            list.add(first);
            list.addAll(sub);

            result.add(list);
            result.add(sub);
        }

        return result;
    }

    static boolean testsPass()
    {
        List<List<Character>> result = generate("ABC");
        boolean check = result.size() == 8;
        if(!check)
        {
            return false;
        }
        char[] a = result.get(0).stream().map(Object::toString).collect(Collectors.joining()).toCharArray();
        check = Arrays.equals(new char[] {'A', 'B', 'C'}, a);
        if(!check)
        {
            return false;
        }
        a = result.get(1).stream().map(Object::toString).collect(Collectors.joining()).toCharArray();
        check = Arrays.equals(new char[] {'B', 'C'}, a);
        if(!check)
        {
            return false;
        }
        a = result.get(2).stream().map(Object::toString).collect(Collectors.joining()).toCharArray();
        check = Arrays.equals(new char[] {'A', 'C'}, a);
        if(!check)
        {
            return false;
        }
        a = result.get(3).stream().map(Object::toString).collect(Collectors.joining()).toCharArray();
        check = Arrays.equals(new char[] {'C'}, a);
        if(!check)
        {
            return false;
        }
        a = result.get(4).stream().map(Object::toString).collect(Collectors.joining()).toCharArray();
        check = Arrays.equals(new char[] {'A', 'B'}, a);
        if(!check)
        {
            return false;
        }
        a = result.get(5).stream().map(Object::toString).collect(Collectors.joining()).toCharArray();
        check = Arrays.equals(new char[] {'B'}, a);
        if(!check)
        {
            return false;
        }
        a = result.get(6).stream().map(Object::toString).collect(Collectors.joining()).toCharArray();
        check = Arrays.equals(new char[] {'A'}, a);
        if(!check)
        {
            return false;
        }
        a = result.get(7).stream().map(Object::toString).collect(Collectors.joining()).toCharArray();
        check = Arrays.equals(new char[0], a);
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
