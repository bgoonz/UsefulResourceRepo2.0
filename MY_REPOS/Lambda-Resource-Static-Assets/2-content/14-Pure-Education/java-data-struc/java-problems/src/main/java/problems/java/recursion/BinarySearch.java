package problems.java.recursion;

public class BinarySearch
{
    static<T extends Comparable<T>> int binarySearch(T[] a, T val)
    {
        int left = 0, right = a.length - 1;
        return binarySearch(a, val, left, right);
    }

    private static<T extends Comparable<T>> int binarySearch(T[] a, T val, int start, int end)
    {
        if(end < start)
        {
            return -1;
        }

        int mid = (start + end) / 2;
        T midVal = a[mid];
        if(midVal.compareTo(val) == 0)
        {
            return mid;
        }
        else if(midVal.compareTo(val) == -1)
        {
            return binarySearch(a, val, mid + 1, end);
        }
        else
        {
            return binarySearch(a, val, start, mid - 1);
        }
    }

    static boolean testsPass()
    {
        //             0  1  2  3  4   5   6   7   8   9
        Integer[] a = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
        boolean check = binarySearch(a, 1) == 0;
        check = binarySearch(a, 15) == 7;
        if(!check)
        {
            return false;
        }
        check = binarySearch(a, 10) == -1;
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
