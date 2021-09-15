package data.structures.java.functional.numbers;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class PythagoreanTriplesTest
{

  @Test
  public void generate()
  {
    List<double[]> list = PythagoreanTriples.generate(13);
    assertEquals(4, list.size());
    assertArrayEquals(new double[] {3.0, 4.0, 5.0}, list.get(0), 0.0);
    assertArrayEquals(new double[] {5.0, 12.0, 13.0}, list.get(1), 0.0);
    assertArrayEquals(new double[] {6.0, 8.0, 10.0}, list.get(2), 0.0);
    assertArrayEquals(new double[] {9.0, 12.0, 15.0}, list.get(3), 0.0);
  }
}