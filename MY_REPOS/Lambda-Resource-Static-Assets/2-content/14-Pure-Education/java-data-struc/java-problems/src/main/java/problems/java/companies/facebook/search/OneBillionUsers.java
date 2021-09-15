package problems.java.companies.facebook.search;

public class OneBillionUsers
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=951929261870357

    We have N different apps with different user growth rates.
    At a given time t, measured in days, the number of users using an app is g^t
    (for simplicity we'll allow fractional users), where g is the growth rate for that app.
    These apps will all be launched at the same time and no user ever uses more than one of the apps.
    We want to know how many total users there are when you add together the number of users from each app.
    After how many full days will we have 1 billion total users across the N apps?

    Example:                Example:                        Example:
    growthRates = [1.5]     growthRates = [1.1, 1.2, 1.3]   growthRates = [1.01, 1.02]
    output = 52             output = 79                     output = 1047
    */

    static int getBillionUsersDay(float[] growthRates)
    {
        return 0;

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
