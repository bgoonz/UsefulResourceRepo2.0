package problems.java.common;

import java.util.Arrays;

public class Common
{
    public static int randomRange(int lower, int upper)
    {
        return lower + (int)(Math.random() * (upper - lower));
    }

    public static<T> void swap(T[] data, int first, int second)
    {
        T temp = data[first];
        data[first] = data[second];
        data[second] = temp;
    }

    public static void swap(int[] data, int first, int second)
    {
        int temp = data[first];
        data[first] = data[second];
        data[second] = temp;
    }

    public static void swap(char[] data, int first, int second)
    {
        char temp = data[first];
        data[first] = data[second];
        data[second] = temp;
    }

    public static<T> void reverse(T[] a)
    {
        int start = 0, end = a.length - 1;
        while(start < end)
        {
            T temp = a[start];
            a[start++] = a[end];
            a[end--] = temp;
        }
    }

    public static int digitsInNumber(int n)
    {
        return (int)Math.log10(n) + 1;
    }

    public static int min3(int a, int b, int c)
    {
        return Math.min(Math.min(a, b), c);
    }

    public static int max3(int a, int b, int c)
    {
        return Math.max(Math.max(a, b), c);
    }

    public static String sortString(String s)
    {
        char[] a = s.toCharArray();
        Arrays.sort(a);
        return new String(a);
    }
}
