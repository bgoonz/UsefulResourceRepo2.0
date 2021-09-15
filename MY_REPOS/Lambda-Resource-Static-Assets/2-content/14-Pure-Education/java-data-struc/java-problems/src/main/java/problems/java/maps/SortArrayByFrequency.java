package problems.java.maps;

import java.util.*;

public class SortArrayByFrequency
{
    static int[] sortByFrequency(int [] a)
    {
        Map<Integer,Integer> map = Arrays.stream(a).boxed().collect(
                LinkedHashMap::new,
                (m, i) -> m.merge(i, 1, Integer::sum),
                LinkedHashMap::putAll);

        Map<Integer,List<Integer>> frequencyMap = new TreeMap<>(Comparator.reverseOrder());
        for(Map.Entry<Integer, Integer> entry : map.entrySet())
        {
            frequencyMap.computeIfAbsent(entry.getValue(), x -> new ArrayList<>()).add(entry.getKey());
        }

        List<Integer> result = new ArrayList<>();
        for(Map.Entry<Integer, List<Integer>> entry : frequencyMap.entrySet())
        {
            int frequency = entry.getKey();
            List<Integer> values = entry.getValue();

            for(int value : values)
            {
                for(int i = 0; i < frequency; ++i)
                {
                    result.add(value);
                }
            }
        }

        return result.stream().mapToInt(x -> x).toArray();
    }

    static boolean testsPass()
    {
        boolean check = Arrays.equals(sortByFrequency(new int[] {3, 2, 1, 3, 1, 2, 3, 2, 3}),
                new int[] {3, 3, 3, 3, 2, 2, 2, 1, 1});
        if(!check)
        {
            return false;
        }

        check = Arrays.equals(sortByFrequency(new int[] {3, 3, 1, 1, 2, 2}),
                new int[] {3, 3, 1, 1, 2, 2});
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
