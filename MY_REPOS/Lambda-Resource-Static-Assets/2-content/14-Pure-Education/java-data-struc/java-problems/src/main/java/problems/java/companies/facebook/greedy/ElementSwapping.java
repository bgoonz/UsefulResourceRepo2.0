package problems.java.companies.facebook.greedy;

public class ElementSwapping
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=838749853303393

    Given a sequence of n integers arr, determine the lexicographically smallest sequence which may be obtained from it
    after performing at most k element swaps, each involving a pair of consecutive elements in the sequence.

    Example:                Example:
    n = 3                   n = 5
    k = 2                   k = 3
    arr = [5, 3, 1]         arr = [8, 9, 11, 2, 1]
    output = [1, 5, 3]      output = [2, 8, 9, 11, 1]

    */

    static int[] findMinArray(int[] arr, int k)
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
