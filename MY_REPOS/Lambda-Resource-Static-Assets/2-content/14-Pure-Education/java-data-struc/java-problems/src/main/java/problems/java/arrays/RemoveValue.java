package problems.java.arrays;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

public class RemoveValue
{
    static int[] removeValue(int[] a, int val)
    {
        int pos = 0;
        for(int v : a)
        {
            if(v != val)
            {
                a[pos++] = v;
            }
        }
        return Arrays.copyOf(a, pos);
    }

    static int[] removeValueWithStreams(int[] a, int val)
    {
        return Arrays.stream(a).filter(x -> x != val).toArray();
    }

    static int[] removeValueWithIterator(int[] a, int val)
    {
        List<Integer> list = Arrays.stream(a).boxed().collect(Collectors.toList());
        Iterator<Integer> iter = list.iterator();
        while(iter.hasNext())
        {
            if(iter.next() == val)
            {
                iter.remove();
            }
        }
        return list.stream().mapToInt(x -> x).toArray();
    }

    static boolean testsPass()
    {
        int[] a = removeValue(new int[]{9, 8, 7, 6, 5, 4, 3, 2, 1}, 5);
        int[] b = removeValueWithStreams(new int[]{9, 8, 7, 6, 5, 4, 3, 2, 1}, 5);
        int[] c = removeValueWithIterator(new int[]{9, 8, 7, 6, 5, 4, 3, 2, 1}, 5);
        return Arrays.equals(a, new int[] {9, 8, 7, 6, 4, 3, 2, 1}) &&
                Arrays.equals(b, new int[] {9, 8, 7, 6, 4, 3, 2, 1}) &&
                Arrays.equals(c, new int[] {9, 8, 7, 6, 4, 3, 2, 1});
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
