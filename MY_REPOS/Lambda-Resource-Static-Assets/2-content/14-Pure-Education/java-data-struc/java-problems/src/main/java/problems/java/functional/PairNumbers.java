package problems.java.functional;

import java.util.Arrays;
import java.util.List;

public class PairNumbers
{
    static List<int[]> pairNumbers(int[] a1, int[] a2)
    {
        return null;
    }

    static boolean testsPass()
    {
        int [] a1 = {1, 2, 3};
        int [] a2 = {3, 4};
        List<int[]> result = pairNumbers(a1, a2);
        boolean check = result.size() == 6;
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {1, 3}, result.get(0)) &&
                Arrays.equals(new int[] {1, 4}, result.get(1)) &&
                Arrays.equals(new int[] {2, 3}, result.get(2)) &&
                Arrays.equals(new int[] {2, 4}, result.get(3)) &&
                Arrays.equals(new int[] {3, 3}, result.get(4)) &&
                Arrays.equals(new int[] {3, 4}, result.get(5));
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
