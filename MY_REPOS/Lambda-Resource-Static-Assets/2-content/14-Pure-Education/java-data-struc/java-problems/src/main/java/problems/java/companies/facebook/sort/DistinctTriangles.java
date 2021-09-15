package problems.java.companies.facebook.sort;

import java.util.Arrays;

public class DistinctTriangles
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=720422605157879

    Given a list of N triangles with integer side lengths, determine how many different triangles there are.
    Example:                                    Example:
    arr = [[2, 2, 3], [3, 2, 2], [2, 5, 6]]     arr = [[8, 4, 6], [100, 101, 102], [84, 93, 173]]
    output = 2                                  output = 3

    Example:
    arr = [[5, 8, 9], [5, 9, 8], [9, 5, 8], [9, 8, 5], [8, 9, 5], [8, 5, 9]]
    output = 1
    */

    static int countDistinctTriangles(int[][] triangles)
    {
        for(int i = 0; i < triangles.length; ++i)
        {
            Arrays.sort(triangles[i]);
        }


        int count = 1;
        for(int i = 1; i < triangles.length; ++i)
        {
            int[] current = triangles[i];
            int[] prior = triangles[i - 1];
            if(current[0] != prior[0] || current[1] != prior[1] || current[2] != prior[2])
            {
                count++;
            }
        }
        return count;
    }

    static boolean testsPass()
    {
        int[][] firstSet = new int[][] {
                {2, 2, 3},
                {3, 2, 2},
                {2, 5, 6}
        };

        int[][] secondSet = new int[][] {
                {8, 4, 6},
                {100, 101, 102},
                {84, 93, 173}
        };

        int[][] thirdSet = new int[][] {
                {5, 8, 9},
                {5, 9, 8},
                {9, 5, 8},
                {9, 8, 5},
                {8, 9, 5},
                {8, 5, 9}
        };
        boolean check = countDistinctTriangles(firstSet) == 2;
        if(!check)
        {
            return false;
        }
        check = countDistinctTriangles(secondSet) == 3;
        if(!check)
        {
            return false;
        }
        check = countDistinctTriangles(thirdSet) == 1;
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
