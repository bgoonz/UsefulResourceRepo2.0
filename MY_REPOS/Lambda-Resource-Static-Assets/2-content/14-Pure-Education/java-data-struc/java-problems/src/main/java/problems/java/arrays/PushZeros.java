package problems.java.arrays;

import java.util.Arrays;

public class PushZeros
{
    static void pushToBack(int[] a)
    {
        int pos = 0;
        for(int v : a)
        {
            if(v != 0)
            {
                a[pos++] = v;
            }
        }
        if(pos < a.length)
        {
            Arrays.fill(a, pos, a.length, 0);
        }
    }

    static int[] pushToBackWithStreams(int[] a)
    {
        int[] nonZeros = Arrays.stream(a).filter(x -> x != 0).toArray();

        int[] result = new int[a.length];
        System.arraycopy(nonZeros, 0, result, 0, nonZeros.length);
        return result;
    }

    static void pushToFront(int[] a)
    {
        int pos = a.length - 1;
        for(int i = a.length - 1; i >= 0; --i)
        {
            if(a[i] != 0)
            {
                a[pos--] = a[i];
            }
        }
        while(pos >= 0)
        {
            a[pos--] = 0;
        }
    }

    static int[] pushToFrontWithStreams(int[] a)
    {
        int[] nonZeros = Arrays.stream(a).filter(x -> x != 0).toArray();

        int[] result = new int[a.length];
        System.arraycopy(nonZeros, 0, result,  a.length - nonZeros.length, nonZeros.length);
        return result;
    }

    static boolean testsPass()
    {
        int[] a = {1, 2, 0, 3, 0, 4, 5, 0, 6};
        pushToBack(a);
        boolean check = Arrays.equals(a, new int[]{1, 2, 3, 4, 5, 6, 0, 0, 0});
        if (!check)
        {
            return false;
        }

        a = new int[]{1, 2, 0, 3, 0, 4, 5, 0, 6};
        a = pushToBackWithStreams(a);
        check = Arrays.equals(a, new int[]{1, 2, 3, 4, 5, 6, 0, 0, 0});
        if (!check)
        {
            return false;
        }

        a = new int[]{1, 2, 0, 3, 0, 4, 5, 0, 6};
        pushToFront(a);
        check = Arrays.equals(a, new int[]{0, 0, 0, 1, 2, 3, 4, 5, 6});
        if (!check)
        {
            return false;
        }

        a = new int[]{1, 2, 0, 3, 0, 4, 5, 0, 6};
        a = pushToFrontWithStreams(a);
        check = Arrays.equals(a, new int[]{0, 0, 0, 1, 2, 3, 4, 5, 6});
        if (!check)
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