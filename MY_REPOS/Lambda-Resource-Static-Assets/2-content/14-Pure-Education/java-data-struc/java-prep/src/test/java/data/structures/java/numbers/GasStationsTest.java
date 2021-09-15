package data.structures.java.numbers;

import data.structures.java.numbers.GasStations;
import org.junit.Test;

import static org.junit.Assert.*;

public class GasStationsTest
{

  @Test
  public void startingStation()
  {
    int [][] data = {
        {4, 6},
        {6, 5},
        {1, 3},
        {7, 4},
    };
    GasStations gasStations = new GasStations(data);
    assertEquals(3, gasStations.startingStation());
  }
}