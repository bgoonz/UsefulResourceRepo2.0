package problems.java.fifo_lifo;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.Stack;
import java.util.stream.Collectors;

public class BalancedParens
{
    static boolean balancedParens(String s)
    {
        Map<Character,Character> parensMap = new HashMap<Character,Character>() {{
            put('(', ')');
            put('{', '}');
            put('[', ']');
            put('<', '>');

        }};

        Set<Character> closingSet = parensMap.values().stream().collect(Collectors.toSet());

        Stack<Character> stack = new Stack<>();
        for(char c : s.toCharArray())
        {
            if(parensMap.containsKey(c))
            {
                stack.push(c);
            }
            else if(closingSet.contains(c))
            {
                if(stack.empty())
                {
                    return false;
                }
                char popped = stack.pop();
                if(parensMap.get(popped) != c)
                {
                    return false;
                }
            }
        }

        return stack.empty();
    }

    static boolean testsPass()
    {
        String balanced = "[he[ll(0) how]{are<(you)>}]", unbalanced = "[he[ll(0) how]{are<(you>)}]";
        boolean check = balancedParens(balanced) && !balancedParens(unbalanced);
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
