package data.structures.java.numbers;

public class ClockAngle
{
  //  The minute hand moves 360 degrees in 60 minute(or 6 degree in one minute)
  //  The hour hand moves 360 degrees in 12 hours (720 mins), or 0.5 degrees per minute.
  //  In h hours and m minutes:
  //    the hour hand will move (h * 60 + m) * 0.5 degrees
  //    the minute hand will move (h * 60 + m) * 6 degrees
  //  Assume 12:00 as the reference point

  static int angle(double hour, double min)
  {
    if(hour < 0 || min < 0 || hour > 12 || min > 60)
    {
      return -1;
    }

    if(hour == 12)
    {
      hour = 0;
    }
    if(min == 60)
    {
      min = 0;
    }

    int hourAngle = (int)(0.5 * (hour * 60 + min));
    int minAngle = (int)(6 * min);
    //int minAngle = (int)(6 * (hour * 60 + min) % 360);

    int angle = Math.abs(hourAngle - minAngle);
    angle = Math.min(360 - angle, angle);
    return angle;
  }

  //  Note the explanation given above:
  //  In h hours and m minutes:
  //    the hour hand will move (h * 60 + m) * 0.5 degrees
  //    the minute hand will move (h * 60 + m) * 6 degrees, or 6 * m
  //  For them to superimpose, both angles should be equal
  //  0.5 * (60H + M) = 6*M
  //  60H + M = 12M
  //  60H = 11M
  //  M = 5.45H
  //  Thus, as H varies from 1 to 11, hands will overlap 11 times in 12 hours
  //  H   M
  //  -----
  //  1   1:05.45
  //  2   2:10.90
  //  3   3:16.36
  //  ...



}
