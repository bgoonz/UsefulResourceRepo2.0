package problems.java.arrays;

import java.util.Arrays;

public class MinimumPlatforms
{
    /*
    Given arrival and departure times of all trains that reach a railway station.
    Find the minimum number of platforms required for the railway station
    so that no train is kept waiting.
    Input:
        arr[] = [0900 0940 0950 1100 1500 1800]
        dep[] = [0910 1200 1120 1130 1900 2000]
    Output: 3

    Time      Event Type     Total Platforms Needed
    9:00       Arrival                  1
    9:10       Departure                0
    9:40       Arrival                  1
    9:50       Arrival                  2
    11:00      Arrival                  3
    11:20      Departure                2
    11:30      Departure                1
    12:00      Departure                0
    15:00      Arrival                  1
    18:00      Arrival                  2
    19:00      Departure                1
    20:00      Departure                0
    */

    static int countMinimumPlatforms(int[] arr, int [] dep)
    {
        if(arr.length != dep.length)
        {
            return -1;
        }

        int len = arr.length;

        Arrays.sort(arr);
        Arrays.sort(dep);

        int arrPos = 1, depPos = 0, platsNeeded = 1, result = 1;
        while(arrPos < len && depPos < len)
        {
            if(arr[arrPos] <= dep[depPos])
            {
                platsNeeded++;
                arrPos++;
            }
            else if(arr[arrPos] > dep[depPos])
            {
                platsNeeded--;
                depPos++;
            }

            result = Math.max(result, platsNeeded);
        }

        return result;
    }

    static boolean testsPass()
    {
        int[] arrivals =   {900, 940,  950,  1100, 1500, 1800};
        int[] departures = {910, 1200, 1120, 1130, 1900, 2000};
        boolean check = countMinimumPlatforms(arrivals, departures) == 3;
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
