package problems.java.sort;

import java.util.Arrays;

public class RadixSort
{
    /*
    Use LSD (least significant digit) method by repeatedly sorting digits by single digit from right to left
    Given: { 170, 45, 75, 90, 802, 2, 66 }
    Treat all values as having same number of digits:
    Given: { 170, 045, 075, 090, 802, 002, 066 }
    1st Pass: { 170, 090, 802, 002, 045, 075, 066 }
    2nd Pass: { 802, 002, 045, 066, 170, 075, 090 }
    3rd Pass: { 002, 045, 066, 075, 090, 170, 802 }
    */

    static void sort(int [] a)
    {
        //  Determine number of digits
        int max = Arrays.stream(a).max().getAsInt();
        int digits = (int)Math.log(max) + 1;
        for(int exp = 0; exp < digits; ++exp)
        {
            countSort(a, (int)Math.pow(10, exp));
        }
    }

    /*
    a[]:    170 45  75  90  802 2   66
    Count:
    Index:  0   1   2   3   4   5   6   7   8   9
    for #1: 2   0   2   0   0   2   1   0   0   0
    for #2: 2   2   4   4   4   6   7   7   7   7

    for #1 counts how many digits end on number, i.e. 2 end on 0, 2 end on 2, 1 ends on 6, ...
    for #2 sums from left to right
    Result rearranges array based on last digit
    */
    private static void countSort(int[] a, int exp)
    {
        int[] count = new int[10];

        for(int i = 0; i < a.length; ++i)
        {
            count[(a[i] / exp) % 10]++;
        }

        for(int i = 1; i < 10; ++i)
        {
            count[i] += count[i - 1];
        }

        int[] result = new int[a.length];
        for(int i = a.length - 1; i >= 0; --i)
        {
            result[count[a[i] / exp % 10] - 1] = a[i];
            count[a[i] / exp % 10]--;
        }

        System.arraycopy(result, 0, a, 0, a.length);
    }

    static boolean testsPass()
    {
        int[] data = { 170, 45, 75, 90, 802, 2, 66 };
        sort(data);
        boolean check = Arrays.equals(new int[] {2, 45, 66, 75, 90, 170, 802}, data);
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
