package problems.java.sort;

import java.util.Arrays;

import static problems.java.common.Common.swap;

public class Sort
{
    /////////////////////////////////////////////////////////////////
    static void bubbleSort(int[] a)
    {
        boolean swapped;
        do
        {
            swapped = false;
            for(int i = 1; i < a.length; ++i)
            {
                if(a[i - 1] > a[i])
                {
                    swapped = true;
                    swap(a, i, i - 1);
                }
            }
        } while(swapped);
    }

    /////////////////////////////////////////////////////////////////
    static void quickSort(int[] a)
    {
        quickSort(a, 0, a.length - 1);
    }

    private static int partition(int[] a, int left, int right)
    {
        int pivot = a[(left + right) / 2];
        while(left <= right)
        {
            while(a[left] < pivot) left++;
            while(a[right] > pivot) right--;
            if(left <= right)
            {
                swap(a, left++, right--);
            }
        }
        return left;
    }

    private static void quickSort(int[] a, int left, int right)
    {
        int idx = partition(a, left, right);
        if(left < idx - 1)
        {
            quickSort(a, left, idx - 1);
        }
        if(idx < right)
        {
            quickSort(a, idx, right);
        }
    }

    /////////////////////////////////////////////////////////////////
    static void mergeSort(int[] a)
    {
        if(a.length < 2)
        {
            return;
        }

        int mid = a.length / 2;
        int [] left = new int[mid], right = new int[a.length - mid];
        System.arraycopy(a, 0, left, 0, left.length);
        System.arraycopy(a, mid, right, 0, right.length);
        mergeSort(left);
        mergeSort(right);
        merge(a, left, right);
    }

    private static void merge(int[] dst, int[] left, int[] right)
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
    /////////////////////////////////////////////////////////////////
    static void insertionSort(int[] a)
    {
        for(int i = 1; i < a.length; ++i)
        {
            for(int j = i; j > 0; --j)
            {
                if(a[j - 1] > a[j])
                {
                    swap(a, j, j - 1);
                }
            }
        }
    }

    static boolean testsPass()
    {
        int[] data = {5, 1, 4, 9, 6, 2, 7, 3, 8};
        bubbleSort(data);
        boolean check = Arrays.equals(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9}, data);
        if(!check)
        {
            return false;
        }
        data = new int[]{5, 1, 4, 9, 6, 2, 7, 3, 8};
        quickSort(data);
        check = Arrays.equals(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9}, data);
        if(!check)
        {
            return false;
        }
        data = new int[]{5, 1, 4, 9, 6, 2, 7, 3, 8};
        mergeSort(data);
        check = Arrays.equals(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9}, data);
        if(!check)
        {
            return false;
        }
        data = new int[]{5, 1, 4, 9, 6, 2, 7, 3, 8};
        insertionSort(data);
        check = Arrays.equals(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9}, data);
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
