package data.structures.java.maps;

import org.junit.Test;

import static org.junit.Assert.*;

public class BestAverageTest
{

  @Test
  public void compute1()
  {
    String[][] data = {{"nick", "80"}, {"paul", "50"}, {"ron", "60"}, {"nick", "100"}};
    BestAverage bestAverage = new BestAverage(data);

    assertEquals(90, bestAverage.compute1());
  }

  @Test
  public void compute2()
  {
    String[][] data = {{"nick", "80"}, {"paul", "50"}, {"ron", "60"}, {"nick", "100"}};
    BestAverage bestAverage = new BestAverage(data);

    assertEquals(90, bestAverage.compute2());
  }
}