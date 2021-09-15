package problems.java.strings;

import org.apache.commons.lang3.tuple.Pair;

public class MagicPotion
{
    //  Consider the following potion which uses 4 distinct ingredients:
    //      A, B, A, B, C, A, B, A, B, C, D
    //  special instruction, '*', which means "repeat from the beginning", thus:
    //  A, B, A, B, C, A, B, A, B, C, D = A,B,*,C,*,D
    //  write a function that takes as input an un-encoded potion and returns
    //  the minimum number of characters required

    static Pair<String, Integer> encrypted(String ingredients)
    {
        int len = ingredients.length();
        if (len == 0)
        {
            return null;
        }

        StringBuilder sb = new StringBuilder();
        sb.append(ingredients.charAt(0));

        for (int i = 1; i < len; i++)
        {
            if(i * 2 <= len)
            {
                String s = ingredients.substring(0, i);
                if(s.equals(ingredients.substring(i, 2 * i)))
                {
                    sb.append("*");
                    i = 2 * i - 1;
                }
                else
                {
                    sb.append(ingredients.charAt(i));
                }
            }
            else
            {
                sb.append(ingredients.charAt(i));
            }
        }

        return Pair.of(sb.toString(), sb.length());
    }

    static boolean testsPass()
    {
        Pair<String,Integer> pair = encrypted("ABABCABABCD");
        boolean check = pair.getLeft().equals("AB*C*D") && pair.getRight() == 6;
        if(!check)
        {
            return false;
        }

        pair = encrypted("ABCABCE");
        check = pair.getLeft().equals("ABC*E") && pair.getRight() == 5;
        if(!check)
        {
            return false;
        }

        pair = encrypted("AAAAAA");
        check = pair.getLeft().equals("A**AA") && pair.getRight() == 5;
        if(!check)
        {
            return false;
        }

        pair = encrypted("AAAABBBB");
        check = pair.getLeft().equals("A**BBBB") && pair.getRight() == 7;
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
