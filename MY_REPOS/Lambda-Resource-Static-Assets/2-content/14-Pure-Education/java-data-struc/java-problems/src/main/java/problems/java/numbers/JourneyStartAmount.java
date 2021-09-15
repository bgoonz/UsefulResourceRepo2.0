package problems.java.numbers;

public class JourneyStartAmount
{
    // A traveler visits multiple cities.
    // He can work daily and make some money. He also spends some money on each day.
    // An array is given depicting his daily savings (earnings – expenses) over the course of his journey.
    // How much minimum money he should start with in order to have at least some saving ( > 0) at the end of each day.
    //  Examples: arr[] = { 10, -5, 7, -8, 5, -9 }
    //  He had to have 10 before the start of the last day in order to have 1 left after spending 9
    //  At the end of the journey he has $1 left.
    //  Thus:
    //  1 - (-9) = 10
    //  10 - 5 = 5
    //  5 - (-8) = 13
    //  13 - 7 = 6
    //  6 - (-5) = 11
    //  11 - 10 = 1

    static int amountAtStartOfJourney(int[] a)
    {
        int startAmount = 1;
        for(int i = a.length - 1; i >= 0; --i)
        {
            startAmount -= a[i];
        }

        return startAmount;
    }

    static boolean testsPass()
    {
        boolean check = amountAtStartOfJourney(new int[] {10, -5, 7, -8, 5, -9}) == 1;
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
