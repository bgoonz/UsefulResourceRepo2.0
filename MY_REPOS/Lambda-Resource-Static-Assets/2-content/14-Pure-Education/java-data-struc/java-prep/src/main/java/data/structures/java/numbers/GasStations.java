package data.structures.java.numbers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class GasStations
{
  /*
  Input is provided in a 2D array, for example:
    {4, 6},
    {6, 5},
    {1, 3},
    {7, 4},
  Where the first value is the amount of petrol and the next value is the distance to the next station.
  To make it easier, we convert each coordinate to a Unit {petrol, distance}
   */
  static class Unit
  {
    int petrol;
    int distance;
    Unit(int petrol, int distance)
    {
      this.petrol = petrol;
      this.distance = distance;
    }
  }

  private List<Unit> unitList;
  public GasStations(int[][] data)
  {
    unitList = Arrays.stream(data).map((int[] a) -> new Unit(a[0], a[1])).collect(Collectors.toList());
  }

  public int startingStation()
  {
    int supply = 0;
    //  Use loop to find a valid starting point
    for(int i = 0; i < unitList.size(); ++i)
    {
      Unit unit = unitList.get(i);
      if(unit.distance > unit.petrol + supply)
      {
        continue;
      }

      //  Check if we can visit all stations from "good" starting point
      int j = 0;
      for(; j < unitList.size(); ++j)
      {
        Unit currentUnit = unitList.get((i + j) % unitList.size());
        if(currentUnit.distance > currentUnit.petrol + supply)
        {
          break;
        }
        supply += currentUnit.petrol - currentUnit.distance;
      }
      //  If we were able to visit all stations
      if(j == unitList.size())
      {
        return i;
      }
      //  Try competing tour from the next station
      supply = 0;
    }

    return -1;
  }
}
