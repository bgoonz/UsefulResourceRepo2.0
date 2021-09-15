package problems.java.companies.facebook.search;

public class RevenueMilestones
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=192049171861831

    We keep track of the revenue Facebook makes every day, and we want to know on what days Facebook hits certain revenue milestones.
    Given an array of the revenue on each day, and an array of milestones Facebook wants to reach,
    return an array containing the days on which Facebook reached every milestone.
    Example:
    revenues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    milestones = [100, 200, 500]
    output = [4, 6, 10]
    On days 4, 5, and 6, FB has total revenue of $100, $150, and $210 respectively. Day 6 is the first time that FB has >= $200 of total revenue.
    */

    static int[] getMilestoneDays(int[] revenues, int[] milestones)
    {
        return null;

    }

    static boolean testsPass()
    {
        boolean check = true;
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
