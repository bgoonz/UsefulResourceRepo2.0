package problems.java.arrays;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class AllUnique
{
    static boolean allUniqueWithSet(int[] a)
    {
        Set<Integer> set = new HashSet<>();
        for(int v : a)
        {
            if(set.contains(v))
            {
                return false;
            }
            set.add(v);
        }

        return true;
    }

    static boolean allUniqueWithArray(int[] a)
    {
        boolean [] check = new boolean[256];
        for(int v : a)
        {
            if(check[v])
            {
                return false;
            }
            check[v] = true;
        }
        return true;
    }

    static boolean allUniqueWithStreams(int[] a)
    {
        Set<Integer> set = Arrays.stream(a).boxed().collect(Collectors.toSet());
        return set.size() == a.length;
    }

    static boolean testsPass()
    {
        int[] a1 = {1, 2, 3, 4, 5, 6, 7, 8, 9};
        int[] a2 = {1, 2, 3, 4, 5, 1, 2, 8, 9};
        boolean b1 = allUniqueWithSet(a1);
        boolean b2 = allUniqueWithSet(a2);
        boolean b3 = allUniqueWithStreams(a1);
        boolean b4 = allUniqueWithStreams(a2);
        boolean b5 = allUniqueWithArray(a1);
        boolean b6 = allUniqueWithArray(a2);
        return b1 && b3 && b5 && !b2 && !b4 && !b6;
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
