package data.structures.java.arrays;

import org.junit.Test;

import java.util.stream.IntStream;

import static junit.framework.Assert.assertTrue;
import static org.junit.Assert.*;

public class AllUniqueTest
{

  @Test
  public void allValuesUnique()
  {
    int[] arr = IntStream.rangeClosed(0, 1000).toArray();
    assertTrue(AllUnique.allValuesUnique(arr));
  }

  @Test
  public void allValuesUnique1()
  {
    int[] arr = IntStream.rangeClosed(0, 1000).toArray();
    assertTrue(AllUnique.allValuesUnique1(arr));
  }
}