package data.structures.java.functional.numbers;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class PythagoreanTriples
{
  public static List<double[]> generate(int n)
  {
    return IntStream.rangeClosed(1, n)
        .boxed()
        .flatMap(a -> IntStream.rangeClosed(a, n)
        .mapToObj(b -> new double[] {a, b, Math.sqrt(a * a + b * b)})
        .filter(t -> t[2] % 1 == 0)).collect(Collectors.toList());
  }
}
