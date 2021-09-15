package data.structures.java.functional.numbers;

import java.util.stream.IntStream;

public class General
{
  public static int[] generateRangeInReverse(int from, int to)
  {
    return IntStream.rangeClosed(from, to).map(i -> to - i + from).toArray();
  }

  public static int[] generateRange(int from, int to)
  {
    return IntStream.rangeClosed(from, to).toArray();
  }
}
