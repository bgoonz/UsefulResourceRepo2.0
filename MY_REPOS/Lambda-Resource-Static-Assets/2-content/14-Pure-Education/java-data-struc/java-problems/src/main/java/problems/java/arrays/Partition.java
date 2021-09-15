package problems.java.arrays;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static problems.java.common.Common.swap;

public class Partition
{
    static void negativeBeforePositive(int[] a)
    {
        int left = 0, right = a.length - 1;
        while(left < right)
        {
            while(a[left] <= 0) left++;
            while(a[right] > 0) right--;
            if(left < right)
            {
                swap(a, left++, right--);
            }
        }
    }

    static int[] negativeBeforePositiveWithStreams(int[] a)
    {
        Map<Boolean, List<Integer>> map = Arrays.stream(a).boxed().collect(Collectors.partitioningBy(x -> x >= 0));
        int[] pos = map.get(true).stream().mapToInt(x -> x).toArray();
        int[] neg = map.get(false).stream().mapToInt(x -> x).toArray();

        int[] result = new int[a.length];
        System.arraycopy(neg, 0, result, 0, neg.length);
        System.arraycopy(pos, 0, result, neg.length, pos.length);
        return result;
    }

    static boolean testsPass()
    {
        int[] a = {4, 5, -1, -2, 7, -5, -9};
        negativeBeforePositive(a);
        int[] b = negativeBeforePositiveWithStreams(new int[] {4, 5, -1, -2, 7, -5, -9});
        return Arrays.equals(a, new int[] {-9, -5, -1, -2, 7, 5, 4}) &&
                Arrays.equals(b, new int[] {-1, -2, -5, -9, 4, 5, 7});
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
