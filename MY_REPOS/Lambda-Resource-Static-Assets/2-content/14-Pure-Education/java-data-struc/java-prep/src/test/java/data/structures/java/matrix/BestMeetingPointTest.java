package data.structures.java.matrix;

import data.structures.java.matrix.BestMeetingPoint;
import org.junit.Test;

import static org.junit.Assert.*;

public class BestMeetingPointTest
{

  @Test
  public void minTotalDistance()
  {
    int[][] data = {
        {1, 0, 0, 0, 1},
        {0, 1, 0, 1, 0},
        {0, 0, 1, 0, 0}
    };
    BestMeetingPoint bestMeetingPoint = new BestMeetingPoint(data);
    assertEquals(9, bestMeetingPoint.minTotalDistance());
  }
}