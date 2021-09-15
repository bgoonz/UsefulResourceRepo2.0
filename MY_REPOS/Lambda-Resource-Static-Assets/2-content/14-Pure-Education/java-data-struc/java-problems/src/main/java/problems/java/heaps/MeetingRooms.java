package problems.java.heaps;

import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;

public class MeetingRooms
{
    //  Consider inputs
    //  [30, 45], [2, 15], 16, 23], [4, 9], [9, 29], [3, 5]
    //  Sorted by start time
    //  [2, 15], [3, 5], [4, 9], [9, 29], [16, 23], [30, 45]
    //  Based on this input, we will need 3 rooms:
    //  Room 1: [4, 9], [9, 29], [30, 45]
    //  Room 2: [2, 15], [16, 23]
    //  Room 3: [3, 5]


    static int minimumRoomsRequired(int[][] intervals)
    {
        Arrays.sort(intervals, Comparator.comparingInt( (int[] a) -> a[0]));
        int roomCount = 1;
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(intervals[0][1]);
        for(int i = 1; i < intervals.length; ++i)
        {
            int[] interval = intervals[i];
            if(interval[0] < pq.peek())
            {
                roomCount++;
            }
            pq.offer(interval[1]);
        }
        return roomCount;
    }


    static boolean testsPass()
    {
        int[][] data = {
                {30, 45},
                {2, 15},
                {16, 23},
                {4, 9},
                {9, 29},
                {3, 5}
        };
        boolean check = minimumRoomsRequired(data) == 3;
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
