package problems.java.strings;

import java.util.Arrays;

public class Encode
{
    static String encode(String s)
    {
        //  aaabbbbbcdddd -> a3b5c1d4
        StringBuilder sb = new StringBuilder();

        char[] a = s.toCharArray();

        char lastChar = a[0];
        int count = 1;
        for(int i = 1; i < a.length; ++i)
        {
            if(a[i] == lastChar)
            {
                count++;
            }
            else
            {
                sb.append(lastChar);
                sb.append(count);
                lastChar = a[i];
                count = 1;
            }
        }
        sb.append(lastChar);
        sb.append(count);
        return sb.toString();
    }

    static String decode(String s)
    {
        //  a3b12c2 -> aaabbbbbbbbbbbbcc
        String[] letters = s.split("[1-9]+");
        String[] numbers = s.split("[a-zA-z]+");
        //  numbers need to be shifted
        numbers = Arrays.copyOfRange(numbers, 1, numbers.length);

        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < letters.length; ++i)
        {
            int n = Integer.parseInt(numbers[i]);
            char[] temp = new char[n];
            Arrays.fill(temp, letters[i].charAt(0));
            sb.append(temp);
         }
        return sb.toString();
    }

    private static int encodeLength(String s)
    {
        //  aaabbbbbbbbbbbbcc -> a3b12c2 -> 7
        char[] a = s.toCharArray();

        char lastChar = a[0];
        int count = 1, size = 0;
        for(int i = 1; i < a.length; ++i)
        {
            if(a[i] == lastChar)
            {
                count++;
            }
            else
            {
                size += 1 + String.valueOf(count).length();
                count = 1;
                lastChar = a[i];
             }
        }
        size += 1 + String.valueOf(count).length();
        return size;
    }

    static boolean testsPass()
    {
        boolean check = encode("aaabbbbbcdddd").equals("a3b5c1d4");
        if(!check)
        {
            return false;
        }
        check = decode("a3b5c1d4").equals("aaabbbbbcdddd");
        if(!check)
        {
            return false;
        }

        check = encodeLength("aaabbbbbbbbbbbbcc") == 7;
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
