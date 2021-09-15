package problems.java.bits;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PowerSet
{
    static List<char[]> generate(String data)
    {

        char[] a = data.toCharArray();
        List<char[]> result = new ArrayList<>();
        int size = 1 << a.length;
        for(int i = 0; i < size; ++i)
        {
            result.add(generateSubSet(a, i));
        }
        return result;
    }

    static private char[] generateSubSet(char[] a, int bit)
    {
        StringBuilder sb = new StringBuilder();
        int idx = 0;
        for(int i = bit; i > 0; i >>= 1)
        {
            if((i & 1) != 0)
            {
                sb.append(a[idx]);
            }
            idx++;
        }

        return sb.toString().toCharArray();
    }

    static boolean testsPass()
    {
        List<char[]> result = generate("ABC");
        boolean check = Arrays.equals(new char[0], result.get(0));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new char[] {'A'}, result.get(1));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new char[] {'B'}, result.get(2));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new char[] {'A', 'B'}, result.get(3));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new char[] {'C'}, result.get(4));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new char[] {'A', 'C'}, result.get(5));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new char[] {'B', 'C'}, result.get(6));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new char[] {'A', 'B', 'C'}, result.get(7));
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
