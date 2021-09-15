package problems.java.arrays;


public class MedianTwoSortedArrays
{
    static double medianWithoutCreatingArrays(int [] a, int [] b)
    {
        int mid = (a.length + b.length) / 2;
        int aPos = 0, bPos = 0;
        int v1 = 0, v2 = 0;
        while(aPos + bPos <= mid)
        {
            v1 = v2;
            if(aPos < a.length && bPos < b.length)
            {
                if(a[aPos] < b[bPos])
                {
                    v2 = a[aPos++];
                }
                else
                {
                    v2 = b[bPos++];
                }
            }
            else if(aPos < a.length)
            {
                v2 = a[aPos++];
            }
            else
            {
                v2 = b[bPos++];
            }
        }

        if((a.length + b.length) % 2 == 1)
        {
            return v2;
        }
        else
        {
            return (v1 + v2) / 2.0;
        }
    }

    public static double medianWithCreatingArrays(int [] a, int [] b)
    {
        int[] c = mergeSortedArrays(a, b);

        if(c.length % 2 == 1)
        {
            return c[c.length / 2];
        }
        else
        {
            return (c[c.length / 2] + c[(c.length + 1) / 2]) / 2.0;
        }
    }

    private static int[] mergeSortedArrays(int[] a, int[] b)
    {
        int[] c = new int[a.length + b.length];

        int aPos = 0, bPos = 0, cPos = 0;
        while(aPos < a.length && bPos < b.length)
        {
            if(a[aPos] < b[bPos])
            {
                c[cPos++] = a[aPos++];
            }
            else
            {
                c[cPos++] = b[bPos++];
            }
        }

        while(aPos < a.length)
        {
            c[cPos++] = a[aPos++];
        }
        while(bPos < b.length)
        {
            c[cPos++] = b[bPos++];
        }

        return c;
    }


    static boolean testsPass()
    {
        int[] a = {1, 3, 5, 7, 9};
        int[] b = {2, 4, 6, 8};
        int[] c = {1, 3, 5, 7};

        boolean check = medianWithCreatingArrays(a, b) == 5.0;
        if(!check)
        {
            return false;
        }

        check = medianWithoutCreatingArrays(a, b) == 5.0;
        if(!check)
        {
            return false;
        }

        check = medianWithoutCreatingArrays(b, c) == 4.5;
        if(!check)
        {
            return false;
        }

        check = medianWithoutCreatingArrays(c, b) == 4.5;
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
