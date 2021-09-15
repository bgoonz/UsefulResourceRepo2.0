package problems.java.maps;

import java.util.HashMap;
import java.util.Map;

public class LengthOfCycle
{
    //    You are given an integer array of size N.
    //    Every element of the array is greater than or equal to 0.
    //    Starting from arr[startIndex], follow each element to the index it points to.
    //    Continue to do this until you find a cycle.
    //    Return the length of the cycle. If no cycle is found return -1
    //
    //    Examples:
    //    countLengthOfCycle({1, 0}, 0) == 2
    //    countLengthOfCycle({1, 2, 0}, 0) == 3

    public static int lengthOfCycle(int[] a, int startIndex)
    {
        Map<Integer, Integer> visitedMap = new HashMap<>();
        int count = 1;
        int index = startIndex;
        while(!visitedMap.containsKey(index))
        {
            if(a[index] > a.length)
            {
                return -1;
            }
            visitedMap.put(index, count++);
            index = a[index];
        }
        return count - visitedMap.get(index);
    }

    static boolean testsPass()
    {
        boolean check = lengthOfCycle(new int[] {1, 2, 0}, 0) == 3;
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
