package problems.java.maps;

import org.apache.commons.lang3.tuple.Pair;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.IntStream;

public class MostCommon
{
    // Given a set of consecutive number ranges. Find the most common number.
    // We can be assured that second dimension is >= than first
    // Given: {{1, 6}, {2, 5}, {3, 8}, {5, 7}}
    // The most popular number would be 5
    // Same approach can be used to figure out which people are alive on a give year, for Example:
    // Person Year Born Year Died
    // ---------------------------
    // A 1958 1988
    // B 1961 1999
    // .. ... ...

    static int mostCommonInRange(int[][] ranges)
    {
        Map<Integer, Integer> countMap = new HashMap<>();

        for(int[] range : ranges)
        {
            IntStream.rangeClosed(range[0], range[1]).forEach(i -> countMap.merge(i, 1, Integer::sum));
        }

        Pair<Integer,Integer> pair = countMap.entrySet().stream()
                .map(e -> Pair.of(e.getKey(), e.getValue()))
                .max(Comparator.comparing(Pair::getRight)).get();

        return pair.getLeft();
    }

    static int mostCommonInRange1(int[][] ranges)
    {
        //  Use this method if Pair class  is not available
        Map<Integer, Integer> countMap = new HashMap<>();

        for(int[] range : ranges)
        {
            IntStream.rangeClosed(range[0], range[1]).forEach(i -> countMap.merge(i, 1, Integer::sum));
        }

        int[] pair = countMap.entrySet().stream()
                .map(e -> new int[]{e.getKey(), e.getValue()})
                .max(Comparator.comparingInt((int[] a) -> a[1])).get();

        return pair[0];
    }


    static boolean testsPass()
    {
        int[][] data = {{1, 6}, {2, 5}, {3, 8}, {5, 7}};
        return mostCommonInRange(data) == 5 &&
                mostCommonInRange1(data) == 5;
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
