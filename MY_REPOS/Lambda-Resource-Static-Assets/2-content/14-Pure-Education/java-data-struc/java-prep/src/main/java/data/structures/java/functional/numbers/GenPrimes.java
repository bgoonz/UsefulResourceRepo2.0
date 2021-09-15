package data.structures.java.functional.numbers;

import java.util.*;
import java.util.function.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static java.util.stream.Collector.Characteristics.CONCURRENT;
import static java.util.stream.Collector.Characteristics.IDENTITY_FINISH;

public class GenPrimes
{
  public static boolean isPrime(int n)
  {
    int candidateRoot = (int)Math.sqrt(n);
    boolean isPrime = IntStream.rangeClosed(2, candidateRoot)
        .noneMatch(i -> n % i == 0);
    return isPrime;
  }

  public static int[] genPrimes(int n)
  {
    Map<Boolean, List<Integer>> result = IntStream.rangeClosed(2, n).boxed()
        .collect(Collectors.partitioningBy(c -> isPrime(c)));
    return  result.get(true).stream().mapToInt(i -> i).toArray();
  }

  private static class PrimeNumberCollector
      implements Collector<Integer, Map<Boolean, List<Integer>>, Map<Boolean,List<Integer>>>
  {
    public static List<Integer> takeWhile(List<Integer> list, Predicate<Integer> p)
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

    public static boolean isPrime(List<Integer> primes, int candidate)
    {
      int candidateSqRt = (int) Math.sqrt(candidate);
      return takeWhile(primes, i -> i <= candidateSqRt).stream().noneMatch(j -> candidate % j == 0);
    }

    @Override
    public Supplier<Map<Boolean, List<Integer>>> supplier()
    {
      return  () -> new HashMap<Boolean, List<Integer>>()
      {{
        put(true, new ArrayList<>());
        put(false, new ArrayList<>());
      }};
    }

    @Override
    public BiConsumer<Map<Boolean, List<Integer>>, Integer> accumulator()
    {
      return (Map<Boolean,List<Integer>> acc, Integer candidate) -> {
        acc.get(isPrime(acc.get(true), candidate)).add(candidate);
      };
    }

    @Override
    public BinaryOperator<Map<Boolean, List<Integer>>> combiner()
    {
      return (Map<Boolean, List<Integer>> m1, Map<Boolean, List<Integer>> m2) -> {
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
  }

  public static Map<Boolean, List<Integer>> partitionPrimesWithCustomCollector(int n)
  {
    return IntStream.rangeClosed(2, n).boxed().collect(new PrimeNumberCollector());
  }
}
