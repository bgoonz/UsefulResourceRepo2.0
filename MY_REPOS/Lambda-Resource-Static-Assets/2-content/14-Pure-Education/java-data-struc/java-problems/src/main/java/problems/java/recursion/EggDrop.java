package problems.java.recursion;

public class EggDrop
{
    static int drop(int topFloor, int eggs)
    {
        if(eggs == 1 || topFloor == 0 || topFloor == 1)
        {
            return topFloor;
        }
        int min = Integer.MAX_VALUE;
        for(int currentFloor = 1; currentFloor <= topFloor; ++ currentFloor)
        {
            int option1 = drop(currentFloor - 1, eggs - 1);
            int option2 = drop(topFloor - currentFloor, eggs);
            int max = Math.max(option1, option2);
            min = Math.min(min, max + 1);
        }
        return min;
    }

    static boolean testsPass()
    {
        boolean check = drop(28, 2) == 7;
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
