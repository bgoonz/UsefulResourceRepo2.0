package problems.java.maps;

import java.util.*;

public class PassingYearbooks
{
    /*
    There are n students, numbered from 1 to n, each with their own yearbook.
    They would like to pass their yearbooks around and get them signed by other students.
    You're given a list of n integers arr[1..n], which is guaranteed to be a permutation of 1..n
    (in other words, it includes the integers from 1 to n exactly once each, in some order).
    The meaning of this list is described below.
    Initially, each student is holding their own yearbook.
    The students will then repeat the following two steps each minute:
    Each student i will first sign the yearbook that they're currently holding
    (which may either belong to themselves or to another student), and then they'll pass it to student arr[i].
    It's possible that arr[i] = i for any given i, in which case student i will pass their yearbook back to themselves.
    Once a student has received their own yearbook back, they will hold on to it and no longer participate in the passing process.
    It's guaranteed that, for any possible valid input, each student will eventually receive their own yearbook back
    and will never end up holding more than one yearbook at a time.
    You must compute a list of n integers output, whose ith element is equal to the number of signatures that will be present
    in student i's yearbook once they receive it back.
    Example:
        Input:  [2,1]
        Output: [2,2]
    The first student will sign their own yearbook and pass it to the second,
    who will also sign it and pass it back to the first student, resulting in 2 signatures.
    Meanwhile, the second student's yearbook will similarly be signed both by themselves and then by the first student.
    Example:
        Input:  [1, 2]
        Output: {1, 1]
    Each student will simply pass their yearbook back to themselves, resulting in 1 signature each.
    */

    static int[] findSignatureCounts(int[] a)
    {
        int[] result = new int[a.length];

        Map<Integer,Integer> map = new HashMap<>();
        for(int i = 0; i< a.length; i++)
        {
            map.put(a[i], i + 1);
        }

        Set<Integer> visited = new HashSet<>();

        for(int key : map.keySet())
        {
            if(!visited.contains(key))
            {
                Set<Integer> round = new HashSet<>();
                while(!visited.contains(key))
                {
                    round.add(key);
                    visited.add(key);
                    key = map.get(key);
                }

                for(int i : round)
                {
                    result[i - 1] = round.size();
                }
            }
        }

        return result;
    }

    static boolean testsPass()
    {
        boolean check = Arrays.equals(findSignatureCounts(new int[] {2, 1}), new int[] {2, 2});
        if(!check)
        {
            return false;
        }

        check = Arrays.equals(findSignatureCounts(new int[] {1, 2}), new int[] {1, 1});
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
