package problems.java.functional;

import java.util.*;
import java.util.function.*;
import java.util.stream.Collector;
import java.util.stream.IntStream;

import static java.util.stream.Collector.Characteristics.CONCURRENT;
import static java.util.stream.Collector.Characteristics.IDENTITY_FINISH;

public class PrimeCollector implements Collector<Integer, Map<Boolean, List<Integer>>, Map<Boolean, List<Integer>>>
{
    private static List<Integer> takeWhile(List<Integer> list, Predicate<Integer> p)
    {
        int i = 0;
        for(Integer item : list)
        {
            if(!p.test(item))
            {
                return list.subList(0, i);
            }
            i++;
        }
        return list;
    }

    private static boolean isPrime(List<Integer> primes, int candidate)
    {
        int candidateSqrt = (int) Math.sqrt(candidate);
        return takeWhile(primes, i -> i <= candidateSqrt).stream().noneMatch(j -> candidate % j == 0);
    }

    @Override
    public Supplier<Map<Boolean, List<Integer>>> supplier()
    {
        return () -> new HashMap<Boolean, List<Integer>>() {{
            put(true, new ArrayList<>());
            put(false, new ArrayList<>());
        }};
    }

    @Override
    public BiConsumer<Map<Boolean, List<Integer>>,Integer> accumulator()
    {
        return (Map<Boolean,List<Integer>> acc, Integer candidate) -> {
            acc.get(isPrime(acc.get(true), candidate)).add(candidate);
        };
    }

    @Override
    public BinaryOperator<Map<Boolean, List<Integer>>> combiner()
    {
        return (Map<Boolean,List<Integer>> m1, Map<Boolean, List<Integer>> m2) -> {
            m1.get(true).addAll(m2.get(true));
            m1.get(false).addAll(m2.get(false));
            return m1;
        };
    }

    @Override
    public Function<Map<Boolean, List<Integer>>, Map<Boolean, List<Integer>>> finisher()
    {
        return Function.identity();
    }

    @Override
    public Set<Characteristics> characteristics()
    {
        return Collections.unmodifiableSet(EnumSet.of(IDENTITY_FINISH, CONCURRENT));
    }

    static boolean testsPass()
    {
        Map<Boolean, List<Integer>> map = IntStream.rangeClosed(2, 20).boxed().collect(new PrimeCollector());
        int[] primes = map.get(true).stream().mapToInt(x -> x).toArray();
        boolean check = Arrays.equals(new int[] {2, 3, 5, 7, 11, 13, 17, 19}, primes);
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
