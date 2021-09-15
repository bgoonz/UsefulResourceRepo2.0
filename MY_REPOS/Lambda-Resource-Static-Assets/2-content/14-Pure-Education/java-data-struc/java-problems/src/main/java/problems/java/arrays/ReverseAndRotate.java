package problems.java.arrays;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class ReverseAndRotate
{
    private static void reverse(int[] a, int start, int end)
    {
        while(start < end)
        {
            int temp = a[start];
            a[start++] = a[end];
            a[end--] = temp;
        }
    }

    static void reverseInPlace(int[] a)
    {
        reverse(a, 0, a.length - 1);
    }

    static int[] reverseWithStreams(int... a)
    {
        List<Integer> list = Arrays.stream(a).boxed().collect(Collectors.toList());
        Collections.reverse(list);
        return list.stream().mapToInt(x -> x).toArray();
    }

    static int[] reverseWithArraysSetAll(int... a)
    {
        int[] reversed = new int[a.length];
        Arrays.setAll(reversed, i -> a[a.length - 1 - i]);
        return reversed;
    }

    static void rotate(int[] a, int m)
    {
        if(a == null || a.length < m)
        {
            return;
        }

        reverse(a, 0, m - 1);
        reverse(a, m, a.length - 1);
        reverse(a, 0, a.length - 1);
    }

    static boolean testsPass()
    {
        int[] a = {1, 2, 3, 4, 5, 6};
        reverseInPlace(a);
        boolean check = Arrays.equals(new int[] {6, 5, 4, 3, 2, 1}, a);
        if(!check)
        {
            return false;
        }

        check = Arrays.equals(reverseWithStreams(1, 2, 3, 4, 5, 6),
                new int[] {6, 5, 4, 3 , 2, 1});
        if(!check)
        {
            return false;
        }

        check = Arrays.equals(reverseWithArraysSetAll(1, 2, 3, 4, 5, 6),
                new int[] {6, 5, 4, 3 , 2, 1});
        if(!check)
        {
            return false;
        }

        int[] a1 = {1, 2, 3, 4, 5, 6, 7};
        rotate(a1, 3);
        check = Arrays.equals(a1, new int[] {4, 5, 6, 7, 1, 2, 3});
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
