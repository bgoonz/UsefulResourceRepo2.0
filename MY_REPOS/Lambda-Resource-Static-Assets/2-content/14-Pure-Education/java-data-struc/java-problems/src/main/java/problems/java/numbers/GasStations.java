package problems.java.numbers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class GasStations
{
    //    Input is provided in a 2D array, for example:
    //    {4, 6},
    //    {6, 5},
    //    {1, 3},
    //    {7, 4},
    //    Where the first value is the amount of petrol and the next value is the distance to the next station.
    //    To make it easier, we convert each coordinate to a Unit {petrol, distance}

    private static class Unit
    {
        int petrol;
        int distance;

        Unit(int petrol, int distance)
        {
            this.petrol = petrol;
            this.distance = distance;
        }
    }

    static int startingStation(int[][] data)
    {
        List<Unit> units = Arrays.stream(data).map(d -> new Unit(d[0], d[1])).collect(Collectors.toList());

        for(int i = 0; i < units.size(); ++i)
        {
            Unit unit = units.get(i);
            if (unit.petrol < unit.distance)
            {
                continue;
            }

            int supply = 0;
            int j;
            for (j = 0; j < units.size(); ++j)
            {
                Unit currentUnit = units.get((i + j) % units.size());
                if (currentUnit.distance > currentUnit.petrol + supply)
                {
                    break;
                }
                supply += currentUnit.petrol - currentUnit.distance;
            }

            if (j == units.size())
            {
                return i;
            }
        }
        return -1;
    }

    static boolean testsPass()
    {
        boolean check = startingStation(new int[][] {{4, 6}, {6, 5}, {1, 3}, {7, 4}}) == 3;
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
