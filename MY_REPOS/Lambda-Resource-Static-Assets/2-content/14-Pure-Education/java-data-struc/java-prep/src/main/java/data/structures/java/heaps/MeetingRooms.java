package data.structures.java.heaps;

import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;

public class MeetingRooms
{
  //  Originally, this problem was implemented using queues and sorting input array on the end time.
  //  However, that solution does not work
  //  Consider inputs (sorted by end time )
  //  [4, 9], [2, 15], [16, 23], [9, 29], [30, 45]
  //  Based on this input, we will need 2 rooms:
  //  Room 1: [4, 9], [9, 29], [30, 45]
  //  Room 2: [2, 15], [16, 23]
  //  However, the queue solution gives result of 3 rooms
  //  Intervals sorted by start time:
  //  [2, 15], [4, 9], [9, 29], [16, 23], [30, 45]

  public static int minMeetingRooms(int[][] intervals)
  {
    //  Sort by start time
    Arrays.sort(intervals, Comparator.comparingInt((int[] a) -> a[0]));

    PriorityQueue<Integer> pq = new PriorityQueue<>();
    //  Place the end time of the first sorted interval on the heap
    pq.offer(intervals[0][1]);
    int roomCount = 1;
    for(int i = 1; i < intervals.length; ++i)
    {
      int[] interval = intervals[i];
      //  If the start of the next interval is AFTER the end of the prior interval, no need for another room
      if(interval[0] >= pq.peek())
      {
        pq.poll();
      }
      else
      {
        roomCount++;
      }
      //  In either case, place end time of the current interval on the heap
      pq.offer(interval[1]);
    }

    return roomCount;
  }
}
