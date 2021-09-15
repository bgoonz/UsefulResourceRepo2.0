package problems.java.arrays;

public class InversionCount
{
    /*
    Inversion count indicates how far (or close) the array is from being sorted.
    If array is already sorted then the inversion count is 0.
    If an array is sorted in the reverse order then the inversion count is the maximum
    Example:
        Input:  {8, 4, 2, 1}
        Output: 6, (8, 4), (4, 2), (8, 2), (8, 1), (4, 1), (2, 1)
    */

    static int inversionCount(int[] a)
    {
        int count = 0;
        for(int i = 0; i < a.length - 1; ++i)
        {
            for(int j = i + 1; j < a.length; ++j)
            {
                if(a[i] > a[j])
                {
                    count++;
                }
            }
        }
        return count;
    }

    static boolean testsPass()
    {
        boolean check = inversionCount(new int[] {8, 4, 2, 1}) == 6;
        if(!check)
        {
            return false;
        }

        check = inversionCount(new int[] {3, 1, 2}) == 2;
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
