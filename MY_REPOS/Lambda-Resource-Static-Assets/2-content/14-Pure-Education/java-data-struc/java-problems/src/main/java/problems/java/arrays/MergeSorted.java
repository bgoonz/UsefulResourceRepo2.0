package problems.java.arrays;

import java.util.Arrays;

public class MergeSorted
{
    static int[] mergeSorted(int[] a, int[] b)
    {
        int[] result = new int[a.length + b.length];
        mergeSorted(result, a, b);
        return result;
    }

    private static void mergeSorted(int[] dst, int[] left, int[] right)
    {
        int dstPos = 0, leftPos = 0, rightPos = 0;
        while(leftPos < left.length && rightPos < right.length)
        {
            if(left[leftPos] < right[rightPos])
            {
                dst[dstPos++] = left[leftPos++];
            }
            else
            {
                dst[dstPos++] = right[rightPos++];
            }
        }
        while(leftPos < left.length)
        {
            dst[dstPos++] = left[leftPos++];
        }
        while(rightPos < right.length)
        {
            dst[dstPos++] = right[rightPos++];
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    static void mergeSortedIntoA(int[] A, int a, int[] B, int b)
    {
        int aPos = a - 1, bPos = b - 1;
        for(int i = A.length - 1; i >= 0; --i)
        {
            if(aPos >= 0 && (A[aPos] > B[bPos] || bPos < 0))
            {
                A[i] = A[aPos--];
            }
            else
            {
                A[i] = B[bPos--];
            }
        }
    }

    static boolean testsPass()
    {
        int [] a = {2, 4, 6, 8};
        int [] b = {1, 3, 5, 7, 9};

        boolean check = Arrays.equals(mergeSorted(a, b),
                new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9});
        if(!check)
        {
            return false;
        }

        int[] A = new int[] {2, 4, 6, 8, 0, 0, 0};
        int[] B = new int[] {1, 3, 5};
        mergeSortedIntoA(A, 4, B, 3);
        check = Arrays.equals(A, new int[] {1, 2, 3, 4, 5, 6, 8});
        if(!check)
        {
            return false;
        }

        A = new int[] {2, 0, 0, 0};
        B = new int[] {1, 3, 5};
        mergeSortedIntoA(A, 1, B, 3);
        check = Arrays.equals(A, new int[] {1, 2, 3, 5});
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
