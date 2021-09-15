package data.structures.java.numbers;

public class EggDrop
{
  /*
  1st Egg If first egg breaks -> 2nd egg                  Drops
  --------------------------------------------------------------
  14      1->2->3->4->5->6->7->8->9->10->11->12->13       1+13=14
  27      15->16->17->18->19->20->21->22->23->24->25->26  2+2=14
  39
  50
  60
  69
  77
  84
  90                                                      9+5=14
  95                                                      10+4=14
  99                                                      11+3=14
  102                                                     12+2=14
  104                                                     13+1=14
  105                                                     14+0=14

  We can see how this becomes the consecutive range sum problem where n = 14
  Thus,
  n(n + 1)/2 = 14*15/2 = 105
  n*n + n - 210 = 0
  Using quadratic equation:

  n = (-1 + Sqrt(1 + 840)) / 2 = 14
   */
  public static int drop(int topFloor)
  {
    return  (-1 + (int)Math.sqrt(1 + 4 * 2* topFloor)) / 2;
  }

  public static int dropRecursive(int topFloor)
  {
    return data.structures.java.recursion.EggDrop.drop(topFloor, 2);
  }

  public static int dropDynamic(int topFloor)
  {
    return data.structures.java.dynamic.EggDrop.drop(topFloor, 2);
  }


}
