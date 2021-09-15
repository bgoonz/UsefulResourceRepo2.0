package problems.java.strings;

public class RemoveUnbalancedParens
{
    static String removeInvalidParentheses(String s)
    {
        String r = remove(s, new char[]{'(', ')'});
        String tmp = remove(new StringBuilder(r).reverse().toString(), new char[]{')', '('});
        return new StringBuilder(tmp).reverse().toString();
    }

    private static String remove(String s, char[] p)
    {
        int count = 0;
        for (int i = 0; i < s.length(); i++)
        {
            if (s.charAt(i) == p[0])
            {
                count++;
            }
            if (s.charAt(i) == p[1])
            {
                count--;
            }

            if (count < 0)
            {
                s = s.substring(0, i) + s.substring(i + 1);
                i--;
                count = 0;
            }
        }
        return s;
    }

    static boolean testsPass()
    {
        boolean check = removeInvalidParentheses("()())()").equals("()()()") &&
                        removeInvalidParentheses("()").equals("()") &&
                        removeInvalidParentheses("(()()))").equals("(()())") &&
                        removeInvalidParentheses("((())()").equals("(())()") &&
                        removeInvalidParentheses("()))((()").equals("()()");

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
