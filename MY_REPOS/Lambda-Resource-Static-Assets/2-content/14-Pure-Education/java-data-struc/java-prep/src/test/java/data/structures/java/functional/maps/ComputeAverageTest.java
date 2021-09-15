package data.structures.java.functional.maps;

import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;

public class ComputeAverageTest
{
  @Test
  public void averages()
  {
    String[][] data = new String[][]{
        {"one", "50"},
        {"two", "70"},
        {"three", "80"},
        {"one", "60"},
        {"two", "90"},
        {"three", "100"}
    };
    Map<String,Long> expectedResult = new HashMap<String,Long>() {{
      put("one", 55L);
      put("two", 80L);
      put("three", 90L);
    }};

    ComputeAverage computeAverage = new ComputeAverage(data);
    Map<String, Long> result = computeAverage.averages();
    assertTrue(expectedResult.equals(result));
  }

}