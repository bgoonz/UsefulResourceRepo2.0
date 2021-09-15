package problems.java.maps;

import java.util.*;
import java.util.stream.Collectors;

public class BestAverage
{
    public static double bestAverageGradeUsingListAndReduce(String[][] data)
    {
        //  Best implementation
        Map<String, List<Double>> totalsMap = Arrays.stream(data).collect(
                HashMap::new,
                (m, i) -> m.computeIfAbsent(i[0], a -> new ArrayList<>()).add(Double.parseDouble(i[1])),
                HashMap::putAll);

        return totalsMap.values().stream()
                .map(a -> a.stream().reduce(0.0, Double::sum) / a.size())
                .reduce(0.0, Double::max);
    }


    public static double bestAverageGradeUsingMerge(String[][] data)
    {
        Map<String,Long> totalsMap = Arrays.stream(data).collect(
                HashMap::new,
                (m, i) -> m.merge(i[0], Long.parseLong(i[1]), Long::sum),
                HashMap::putAll);

        Map<String,Long> countMap = Arrays.stream(data).collect(
                Collectors.groupingBy((String[] a) -> a[0], Collectors.counting()));

        return totalsMap.entrySet().stream()
                .map(e -> e.getValue() / (double)countMap.get(e.getKey()))
                .reduce(0.0, Double::max);
    }

    public static double bestAverageGradeUsingList(String[][] data)
    {
        Map<String, List<Integer>> totalsMap = Arrays.stream(data).collect(
                HashMap::new,
                (m, i) -> m.computeIfAbsent(i[0], a -> new ArrayList<>()).add(Integer.parseInt(i[1])),
                HashMap::putAll);

        double max = 0.0;
        for(List<Integer> list : totalsMap.values())
        {
            max = Math.max(max, list.stream().mapToInt(x -> x).sum() / (double) list.size());
        }

        return max;
    }


    static double bestAverageGradeUsingListAndSummaryStatistics(String[][] data)
    {
        Map<String, List<Integer>> totalsMap = Arrays.stream(data).collect(
                HashMap::new,
                (m, i) -> m.computeIfAbsent(i[0], a -> new ArrayList<>()).add(Integer.parseInt(i[1])),
                HashMap::putAll);

        double maxAvg = 0.0;
        for(List<Integer> list : totalsMap.values())
        {
            IntSummaryStatistics stats = list.stream().mapToInt(x -> x).summaryStatistics();
            maxAvg = Math.max(maxAvg, stats.getAverage());
        }

        return maxAvg;
    }

    static double bestAverageGradeUsingListAndAverage(String[][] data)
    {
        Map<String, List<Integer>> totalsMap = Arrays.stream(data).collect(
                HashMap::new,
                (m, i) -> m.computeIfAbsent(i[0], a -> new ArrayList<>()).add(Integer.parseInt(i[1])),
                HashMap::putAll);

        return totalsMap.values().stream()
                .map(a -> a.stream().mapToDouble(x -> x).average().getAsDouble())
                .reduce(Double::max).get();
    }


    static boolean testsPass()
    {
        String[][] data = {
                {"nick", "81"},
                {"paul", "50"},
                {"ron", "60"},
                {"nick", "100"}
        };
        boolean check = bestAverageGradeUsingMerge(data) == 90.5;
        if(!check)
        {
            return false;
        }

        check = bestAverageGradeUsingList(data) == 90.5;
        if(!check)
        {
            return false;
        }

        check = bestAverageGradeUsingListAndReduce(data) == 90.5;
        if(!check)
        {
            return false;
        }

        check = bestAverageGradeUsingListAndSummaryStatistics(data) == 90.5;
        if(!check)
        {
            return false;
        }

        check = bestAverageGradeUsingListAndAverage(data) == 90.5;
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
