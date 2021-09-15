package problems.java.numbers;

public class EggDrop
{
    //    1st Egg If first egg breaks -> 2nd egg                  Drops
    //    --------------------------------------------------------------
    //    14      1->2->3->4->5->6->7->8->9->10->11->12->13       1+13=14
    //    27      15->16->17->18->19->20->21->22->23->24->25->26  2+2=14
    //    39
    //    50
    //    60
    //    69
    //    77
    //    84
    //    90                                                      9+5=14
    //    95                                                      10+4=14
    //    99                                                      11+3=14
    //    102                                                     12+2=14
    //    104                                                     13+1=14
    //    105                                                     14+0=14
    //
    //    We can see how this becomes the consecutive range sum problem where n = 14
    //    Thus,
    //    n(n + 1)/2 = 14*15/2 = 105
    //    n*n + n - 210 = 0
    //    a = 1, b = 1, c = -210
    //    Using quadratic equation:
    //    x = (-b +/- SQRT(b^2 - 4ac)) / 2a
    //    n = (-1 + Sqrt(1 + 840)) / 2 = 14

    static int drops(int N)
    {
        //  a = 1, b = 1, c = -2N
        int sqrt = (int)Math.sqrt(1 + 8 * N); // SQRT(b^2 - 4ac)
        return (-1 + sqrt)/ 2;
    }

    static boolean testsPass()
    {
        boolean check = drops(105) == 14;
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
