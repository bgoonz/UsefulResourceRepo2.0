package problems.java.maps;

import org.apache.commons.lang3.tuple.Pair;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class DictionaryMapCount
{
    static Map<String,Integer> wordCountWithMerge(String dictionary)
    {
        String[] words = dictionary.split("\\s+");
        return Arrays.stream(words).collect(
                HashMap::new,
                (m, i) -> m.merge(i, 1, Integer::sum),
                HashMap::putAll);
    }

    static Map<String,Long> wordCountWithCounting(String dictionary)
    {
        String[] words = dictionary.split("\\s+");
        return Arrays.stream(words)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }

    static List<String> mostFrequentWord(String dictionary)
    {
        Map<String,Integer> map = wordCountWithMerge(dictionary);

        int mostUsedWord = map.values().stream().mapToInt(x -> x).max().getAsInt();
        return map.entrySet().stream()
                .filter(e -> e.getValue() == mostUsedWord)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    static String firstMostFrequentWord(String dictionary)
    {
        Map<String,Integer> map = wordCountWithMerge(dictionary);

        List<Pair<String,Integer>> pairs = map.entrySet().stream()
                .map(e -> Pair.of(e.getKey(), e.getValue())).collect(Collectors.toList());

        return pairs.stream().max(Comparator.comparing(Pair::getRight)).map(Pair::getLeft).get();
    }



    static boolean testsPass()
    {
        Map<String,Long> result1 = wordCountWithCounting("one two one three two one one");
        boolean check = result1.get("one") == 4 && result1.get("two") == 2 && result1.get("three") == 1;
        if(!check)
        {
            return false;
        }
        Map<String,Integer> result2 = wordCountWithMerge("one two one three two one one");
        check = result2.get("one") == 4 && result2.get("two") == 2 && result2.get("three") == 1;
        if(!check)
        {
            return false;
        }
        check = mostFrequentWord("one two one three two one one").get(0).equals("one");
        if(!check)
        {
            return false;
        }

        check = firstMostFrequentWord("one two one three two one one").equals("one");
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
