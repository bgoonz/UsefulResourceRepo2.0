package problems.java.arrays;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class BinarySearch
{
    //  NOTES:
    //  1.  Use left <= right, NOT left < right
    //  2.  Use right = mid - 1; and left = mid + 1;

    static int binarySearch(int[] a, int val)
    {
        int left = 0, right = a.length - 1;
        while(left <= right)
        {
            int mid = (left + right) / 2;
            int midVal = a[mid];
            if(midVal == val)
            {
                return mid;
            }
            else if(midVal > val)
            {
                right = mid - 1;
            }
            else
            {
                left = mid + 1;
            }
        }
        return -1;
    }

    static int binarySearchWithStreams(int[] a, int val)
    {
        List<Integer> list = Arrays.stream(a).boxed().collect(Collectors.toList());
        return Collections.binarySearch(list, val);
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    static int binarySearchWithInsertPos(int[] a, int val)
    {
        int left = 0, right = a.length - 1;
        while(left <= right)
        {
            int mid = (left + right) / 2;
            int midVal = a[mid];
            if(midVal == val)
            {
                return mid;
            }
            else if(midVal > val)
            {
                right = mid - 1;
            }
            else
            {
                left = mid + 1;
            }
        }
        return -left;
    }

    ///////////////////////////////////////////////////////////////////////////////////
    static int findMinInRotatedArray(int... a)
    {
        //  If the previously sorted array is rotated, a[0] > a[a.length - 1]
        //  If a[0] < a[a.length - 1], the array is not rotated and a[0] is the min
        int start = 0, end = a.length - 1;
        while(start <= end)
        {
            if(a[start] <= a[end])
            {
                return a[start];
            }

            int mid = (start + end) / 2;
            if(a[mid] >= a[start])
            {
                start = mid + 1;
            }
            else
            {
                end = mid;
            }
        }
        return -1;
    }

    static boolean testsPass()
    {
                // 0  1  2  3  4   5   6   7   8   9
        int[] a = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
        boolean check = binarySearch(a, 1) == 0 &&
                        binarySearch(a, 15) == 7 &&
                        binarySearch(a, 10) == -1;
        if(!check)
        {
            return false;
        }

        check = binarySearchWithInsertPos(a, 10) == -5;
        if(!check)
        {
            return false;
        }

        check = binarySearchWithStreams(a, 1) == 0 &&
                binarySearchWithStreams(a, 15) == 7 &&
                binarySearchWithStreams(a, 10) < 0;
        if(!check)
        {
            return false;
        }

        check = findMinInRotatedArray(3,4,5,6,1,2) == 1
                && findMinInRotatedArray(new int[]{4,1,2,3}) == 1
                && findMinInRotatedArray(new int[]{1,2,3,4,5,6}) == 1;
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
