package data.structures.java.stacksqueues;

import java.util.*;

public class StackUtilities
{
  public static boolean balancedParens(String str)
  {
    Map<Character,Character> parenMap = new HashMap<Character,Character>()
    {{
      put('[', ']');
      put('{', '}');
      put('(', ')');
      put('<', '>');
    }};
    Set<Character> closeParens = new HashSet<>(parenMap.values());

    char[] ar = str.toCharArray();
    Stack<Character> stack = new Stack<>();

    for(char c : ar)
    {
      if(parenMap.containsKey(c))
      {
        stack.push(c);
      }

      if(closeParens.contains(c))
      {
        if(stack.empty())
        {
          return false;
        }
        if(parenMap.get(stack.pop()) != c)
        {
          return false;
        }
      }
    }
    return stack.empty() ? true : false;
  }

  public static Stack<Integer> sortAscending(Stack<Integer> stack)
  {
    Stack<Integer> sorted = new Stack<>();

    while(!stack.empty())
    {
      int val = stack.pop();
      if(sorted.empty())
      {
        sorted.push(val);
      }
      else
      {
        while(sorted.peek() < val)
        {
          stack.push(sorted.pop());
        }
        sorted.push(val);
      }
    }
    return sorted;
  }

  //  455 is a result of 100
  //  100 = 4 * 4 * 5
  public static int productOfDigits(int n)
  {
    Stack<Integer> stack = new Stack<>();

    for(int factor = 9; factor > 1; -- factor)
    {
      while(n % factor == 0)
      {
        stack.push(factor);
        n /= factor;
      }
    }

    int num = 0;
    while(!stack.empty())
    {
      num = num * 10 + stack.pop();
    }
    return n == 1 ? num : -1;
  }
}
