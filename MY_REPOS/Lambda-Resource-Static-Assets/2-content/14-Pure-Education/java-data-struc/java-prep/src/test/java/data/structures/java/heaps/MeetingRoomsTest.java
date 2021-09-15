package data.structures.java.heaps;

import org.junit.Test;

import static org.junit.Assert.*;

public class MeetingRoomsTest
{

  @Test
  public void minMeetingRooms()
  {
    int[][] meetings = {
        {30, 45},
        {4, 9},
        {2, 15},
        {9, 29},
        {16, 23},
    };
    assertEquals(2, MeetingRooms.minMeetingRooms(meetings));
  }

  @Test
  public void minMeetingRooms1()
  {
    int [][] meetings = {
        {9, 14},
        {10, 12},
        {11, 13},
        {9, 10},
        {12, 14},
        {10, 15},
        {12, 13},
        {13, 14}
    };

    assertEquals(5, MeetingRooms.minMeetingRooms(meetings));
  }

}