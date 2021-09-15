package problems.java.functional;

import org.apache.commons.lang3.tuple.Pair;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Conversions
{
    //  Notes:
    //  1.  Make sure to user Arrays.sort for sorting in place.
    //      Using streams sorted will not modify underlying collection

    static List<Integer> fromIntArrayToList(int[] a)
    {
        return Arrays.stream(a).boxed().collect(Collectors.toList());
    }

    static Set<Integer> fromIntArrayToSet(int[] a)
    {
        return Arrays.stream(a).boxed().collect(Collectors.toSet());
    }

    static Integer[] fromIntToIntegerArray1(int[] a)
    {
        return Arrays.stream(a).boxed().toArray(Integer[]::new);
    }

    static Integer[] fromIntToIntegerArray2(int[] a)
    {
        return IntStream.of(a).boxed().toArray(Integer[]::new);
    }

    static int[] fromIntegerToIntArray(Integer[] a)
    {
        return Arrays.stream(a).mapToInt(x -> x).toArray();
    }

    static int[] fromListToIntArray(List<Integer> list)
    {
        return list.stream().mapToInt(x -> x).toArray();
    }

    static int[] flatten2DArray(int[][] a)
    {
        return Arrays.stream(a).flatMapToInt(Arrays::stream).toArray();
    }

    static String[] fromIntToStringArray(int[] a)
    {
        return Arrays.stream(a).mapToObj(String::valueOf).toArray(String[]::new);
    }

    static int[] fromStringToIntArray(String[] a)
    {
        return Arrays.stream(a).mapToInt(Integer::valueOf).toArray();
    }

    static int[] arrayOfConsecutiveInts(int start, int end)
    {
        return IntStream.rangeClosed(start, end).toArray();
    }

    static int[] arrayOfConsecutiveIntsReversed(int start, int end)
    {
        return IntStream.rangeClosed(start, end).map(i -> end - i + start).toArray();
    }

    static void fill2DIntArray(int[][] a, int val)
    {
        Arrays.stream(a).forEach(x -> Arrays.fill(x, val));
    }

    static void sort(int[] a)
    {
        Arrays.sort(a);
    }

    static int[] sort1(int [] a, boolean reverseOrder)
    {
        if(!reverseOrder)
        {
            sort(a);
            return a;
        }
        else
        {
            return Arrays.stream(a).boxed().sorted(Comparator.reverseOrder()).mapToInt(x -> x).toArray();
        }
    }

    static int[] sort2(int [] a, boolean reverseOrder)
    {
        if(!reverseOrder)
        {
            sort(a);
            return a;
        }
        else
        {
            List<Integer> temp = Arrays.stream(a).boxed().collect(Collectors.toList());
            Collections.sort(temp, Collections.reverseOrder());
            return temp.stream().mapToInt(x -> x).toArray();
        }
    }

    static void sort2DArrayByDimension(int[][] arr, int dim, boolean reverseOrder)
    {
        if(!reverseOrder)
        {
            Arrays.sort(arr, Comparator.comparingInt((int[] a) -> a[dim]));
        }
        else
        {
            Arrays.sort(arr, Comparator.comparingInt((int[] a) -> a[dim]).reversed());
        }
    }

    static int[] extractDimension(int[][] a, int dim)
    {
        return Arrays.stream(a).mapToInt((int[] x) -> x[dim]).toArray();
    }

    static int[] sumTwoArrays(int[] a1, int[] a2)
    {
        int[] a = new int[a1.length];
        Arrays.setAll(a, x -> a1[x] + a2[x]);
        return a;
    }

    static int productOfArray1(int[] a)
    {
        return Arrays.stream(a).reduce((x, y) -> x * y).getAsInt();
    }

    static int productOfArray2(int[] a)
    {
        return Arrays.stream(a).reduce(1, (x, y) -> x * y);
    }

    static Pair<int[], int[]> separateIntsIntoPosAndNeg(int[] a)
    {
        Map<Boolean, List<Integer>> map = Arrays.stream(a).boxed().collect(Collectors.groupingBy(x -> x >= 0));
        int [] pos = map.get(true).stream().mapToInt(x -> x).toArray();
        int [] neg = map.get(false).stream().mapToInt(x -> x).toArray();
        return Pair.of(pos, neg);
    }

    static char[] numberRangeToCharArray(int from, int to)
    {
        return IntStream.rangeClosed(from, to)
                .mapToObj(c -> Character.toString((char)(c - 1 + 'a')))
                .collect(Collectors.joining())
                .toCharArray();
    }

    static Map<Integer, List<Integer>> from2DIntArrayToMap(int[][] a)
    {
        return Arrays.stream(a).collect(
                HashMap::new,
                (map, item) -> map.computeIfAbsent(item[0], x -> new ArrayList<>()).add(item[1]),
                HashMap::putAll);
    }

    static<T> Map<T, List<T>> from2DArrayToMap(T[][] a)
    {
        return Arrays.stream(a).collect(
                HashMap::new,
                (map, item) -> map.computeIfAbsent(item[0], x -> new ArrayList<>()).add(item[1]),
                HashMap::putAll);
    }

    static List<Character> charArrayToListOfCharacter(char[] a)
    {
        String s = new String(a);
        return s.chars().mapToObj(x -> (char)x).collect(Collectors.toList());
    }

    static Character[] stringToCharacterArray1(String s)
    {
        return s.chars().mapToObj(x -> (char)x).toArray(Character[]::new);
    }

    static Character[] stringToCharacterArray2(String s)
    {
        return IntStream.range(0, s.length()).mapToObj(s::charAt).toArray(Character[]::new);
    }

    static String characterArrayToString(Character[] a)
    {
        return Arrays.stream(a).map(String::valueOf).collect(Collectors.joining());
    }

    static char[] listOfCharacterToCharArray(List<Character> list)
    {
        return list.stream().map(String::valueOf).collect(Collectors.joining()).toCharArray();
    }

    static String stringArrayToString(String[] a, String sep)
    {
        return Arrays.stream(a).collect(Collectors.joining(sep));
    }

    static Map<String,Long> arrayOfWordsToMapOfWordCounts(String[] a)
    {
        return Arrays.stream(a).collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }

    static String longestStringInArray(String[] a)
    {
        Pair<String,Integer> pair = Arrays.stream(a).map(s -> Pair.of(s, s.length())).max(Comparator.comparing(Pair::getRight)).get();
        return pair.getLeft();
    }

    static int keyWhoseValueIsMax(Map<Integer, Integer> countMap)
    {
        int maxCount = countMap.values().stream().max(Comparator.naturalOrder()).get();
        return countMap.entrySet().stream()
                .filter(e -> e.getValue() == maxCount)
                .map(Map.Entry::getKey)
                .findFirst().get();
    }

    static int indexOfItemInArray(int[] a, int item)
    {
        return Arrays.stream(a).boxed().collect(Collectors.toList()).indexOf(item);
    }

    static void init2DArray(int[][] a, int val)
    {
        Arrays.stream(a).forEach(x -> Arrays.fill(x, val));
    }

    static void init3DArray(int[][][] a, int val)
    {
        Arrays.stream(a).forEach(b -> Arrays.stream(b).forEach(c -> Arrays.fill(c, val)));
    }

    static<T> Map<T, T> reverseMapKeysValues(Map<T, T> map)
    {
        return map.entrySet().stream().collect(Collectors.toMap(Map.Entry::getValue, Map.Entry::getKey));
    }

    static boolean testsPass()
    {
        boolean check = Arrays.asList(1, 2, 3).equals(fromIntArrayToList(new int[] {1, 2, 3}));
        if(!check)
        {
            return false;
        }
        Integer[] A = fromIntToIntegerArray1(new int[] {1, 2, 3});
        check = A[0] == 1 && A[1] == 2 && A[2] == 3;
        if(!check)
        {
            return false;
        }
        A = fromIntToIntegerArray2(new int[] {1, 2, 3});
        check = A[0] == 1 && A[1] == 2 && A[2] == 3;
        if(!check)
        {
            return false;
        }
        A = new Integer[] {1, 2, 3};
        check = Arrays.equals(new int[] {1, 2, 3}, fromIntegerToIntArray(A));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {1, 2, 3}, fromListToIntArray(Arrays.asList(1, 2, 3)));
        if(!check)
        {
            return false;
        }
        int[][] aa = new int[][] {{1,2}, {3,4}};
        check = Arrays.equals(new int[] {1, 2, 3, 4}, flatten2DArray(aa));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new String[] {"1", "2", "3"}, fromIntToStringArray(new int[] {1, 2, 3}));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {1, 2, 3}, fromStringToIntArray(new String[] {"1", "2", "3"}));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {2, 3, 4, 5, 6}, arrayOfConsecutiveInts(2, 6));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {6, 5, 4, 3, 2}, arrayOfConsecutiveIntsReversed(2, 6));
        if(!check)
        {
            return false;
        }
        aa = new int[2][2];
        fill2DIntArray(aa, 2);
        check = Arrays.equals(new int[] {2, 2}, aa[0]) && Arrays.equals(new int[] {2, 2}, aa[1]);
        if(!check)
        {
            return false;
        }
        int[] a = new int []{3, 1, 7, 4, 9, 2, 6, 5, 8};
        check = Arrays.equals(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9}, sort1(a, false));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {9, 8, 7, 6, 5, 4, 3, 2, 1}, sort1(a, true));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9}, sort2(a, false));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {9, 8, 7, 6, 5, 4, 3, 2, 1}, sort2(a, true));
        if(!check)
        {
            return false;
        }
        aa = new int[][] {{2, 0, 1}, {5, 4, 6}, {4, 3, 2}, {1, 2, 3}};
        sort2DArrayByDimension(aa, 0, false);
        check = Arrays.equals(new int[] {1, 2, 3}, aa[0]) && Arrays.equals(new int[] {2, 0, 1}, aa[1]) &&
                Arrays.equals(new int[] {4, 3, 2}, aa[2]) && Arrays.equals(new int[] {5, 4, 6}, aa[3]);
        if(!check)
        {
            return false;
        }
        aa = new int[][] {{2, 0, 1}, {5, 4, 6}, {4, 3, 2}, {1, 2, 3}};
        sort2DArrayByDimension(aa, 1, false);
        check = Arrays.equals(new int[] {2, 0, 1}, aa[0]) && Arrays.equals(new int[] {1, 2, 3}, aa[1]) &&
                Arrays.equals(new int[] {4, 3, 2}, aa[2]) && Arrays.equals(new int[] {5, 4, 6}, aa[3]);
        if(!check)
        {
            return false;
        }
        aa = new int[][] {{2, 0, 1}, {5, 4, 6}, {4, 3, 2}, {1, 2, 3}};
        sort2DArrayByDimension(aa, 0, true);
        check = Arrays.equals(new int[] {5, 4, 6}, aa[0]) && Arrays.equals(new int[] {4, 3, 2}, aa[1]) &&
                Arrays.equals(new int[] {2, 0, 1}, aa[2]) && Arrays.equals(new int[] {1, 2, 3}, aa[3]);
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {0, 4, 3, 2},
                extractDimension(new int[][] {{2, 0, 1}, {5, 4, 6}, {4, 3, 2}, {1, 2, 3}}, 1));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {5, 7, 9}, sumTwoArrays(new int [] {1, 2, 3}, new int[] {4, 5, 6}));
        if(!check)
        {
            return false;
        }
        a = new int[] {3, 0, -5, 2, -4, 7, -1};
        Pair<int[], int[]> pair = separateIntsIntoPosAndNeg(a);
        check = Arrays.equals(new int[] {3, 0, 2, 7}, pair.getLeft()) &&
                Arrays.equals(new int[] {-5, -4, -1}, pair.getRight());
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new char[] {'c', 'd', 'e', 'f', 'g'}, numberRangeToCharArray(3, 7));
        if(!check)
        {
            return false;
        }
        Map<Integer, List<Integer>> result1 = from2DIntArrayToMap(new int[][] {{1, 2}, {2, 3}, {1, 4}});
        check = Arrays.equals(new int[] {2, 4}, result1.get(1).stream().mapToInt(x -> x).toArray()) &&
                Arrays.equals(new int[] {3}, result1.get(2).stream().mapToInt(x -> x).toArray());
        if(!check)
        {
            return false;
        }
        Map<String, List<String>> result2 = from2DArrayToMap(new String[][] {{"nick", "90"}, {"paul", "70"}, {"nick", "100"}});
        check = result2.get("nick").size() == 2 && result2.get("nick").contains("90") && result2.get("nick").contains("100");
        if(!check)
        {
            return false;
        }
        check = Arrays.asList('A', 'B', 'C').equals(charArrayToListOfCharacter(new char[] {'A', 'B', 'C'}));
        if(!check)
        {
            return false;
        }
        check = 24 == productOfArray1(new int[] {1, 2, 3, 4});
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new Character[] {'A', 'B', 'C'}, stringToCharacterArray1("ABC"));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new Character[] {'A', 'B', 'C'}, stringToCharacterArray2("ABC"));
        if(!check)
        {
            return false;
        }
        check = characterArrayToString(new Character[] {'A', 'B', 'C'}).equals("ABC");
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new char[] {'A', 'B', 'C'}, listOfCharacterToCharArray(Arrays.asList('A', 'B', 'C')));
        if(!check)
        {
            return false;
        }
        check = stringArrayToString(new String[] {"one", "two", "three"}, " ").equals("one two three");
        if(!check)
        {
            return false;
        }
        Map<String,Long> countMap = arrayOfWordsToMapOfWordCounts(new String[] {"three", "one", "two", "three", "two", "three"});
        check = countMap.get("one") == 1 && countMap.get("two") == 2 && countMap.get("three") == 3;
        if(!check)
        {
            return false;
        }
        check = longestStringInArray(new String[] {"a", "bb", "ccc", "dddd"}).equals("dddd");
        if(!check)
        {
            return false;
        }

        Map<Integer, Integer> map = new HashMap<Integer, Integer>() {{
           put(1, 5);
           put(2, 4);
           put(3, 3);
           put(4, 2);
           put(5, 1);
        }};
        check = keyWhoseValueIsMax(map) == 1;
        if(!check)
        {
            return false;
        }

        check = indexOfItemInArray(new int[] {1, 2, 3, 4, 5, 6, 7}, 4) == 3;
        if(!check)
        {
            return false;
        }

        int[][] t = new int[5][4];
        init2DArray(t, 2);
        check = Arrays.equals(t[0], new int[] {2, 2, 2, 2}) &&
                Arrays.equals(t[1], new int[] {2, 2, 2, 2}) &&
                Arrays.equals(t[2], new int[] {2, 2, 2, 2}) &&
                Arrays.equals(t[3], new int[] {2, 2, 2, 2}) &&
                Arrays.equals(t[4], new int[] {2, 2, 2, 2});

        if(!check)
        {
            return false;
        }

        int[][][] s = new int[5][4][3];
        init3DArray(s, 5);
        check = Arrays.equals(s[0][0], new int[] {5, 5, 5}) &&
                Arrays.equals(s[0][1], new int[] {5, 5, 5}) &&
                Arrays.equals(s[0][2], new int[] {5, 5, 5}) &&
                Arrays.equals(s[1][0], new int[] {5, 5, 5}) &&
                Arrays.equals(s[1][1], new int[] {5, 5, 5}) &&
                Arrays.equals(s[1][2], new int[] {5, 5, 5}) &&
                Arrays.equals(s[2][0], new int[] {5, 5, 5}) &&
                Arrays.equals(s[2][1], new int[] {5, 5, 5}) &&
                Arrays.equals(s[2][2], new int[] {5, 5, 5});

        if(!check)
        {
            return false;
        }

        Map<String,String> result = reverseMapKeysValues(new HashMap<String,String>() {{
            put("one", "1");
            put("two", "2");
            put("three", "3");
        }});
        check = result.get("1").equals("one") &&
                result.get("2").equals("two") &&
                result.get("3").equals("three");
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
