package problems.java.recursion;

import java.util.ArrayList;
import java.util.List;

public class ValidParens
{
    static List<String> generateValidParens(int count)
    {
        List<String> result = new ArrayList<>();
        char[] buffer = new char[count * 2];
        generateValidParens(result, count, count, 0, buffer);
        return result;
    }

    static private void generateValidParens(List<String> result,
                                            int leftRem, int rightRem,
                                            int leftIndex, char[] buffer)
    {
        if(rightRem < leftRem)
        {
            return;
        }

        if(leftRem == 0 && rightRem == 0)
        {
            result.add(new String(buffer));
            return;
        }

        if(leftRem > 0)
        {
            buffer[leftIndex] = '(';
            generateValidParens(result, leftRem - 1, rightRem, leftIndex + 1, buffer);
        }
        if(rightRem > 0)
        {
            buffer[leftIndex] = ')';
            generateValidParens(result, leftRem, rightRem - 1, leftIndex + 1, buffer);
        }

    }

    static boolean testsPass()
    {
        List<String> result = generateValidParens(3);
        boolean check =
                result.get(0).equals("((()))") &&
                        result.get(1).equals("(()())") &&
                        result.get(2).equals("(())()") &&
                        result.get(3).equals("()(())") &&
                        result.get(4).equals("()()()");
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
