package problems.java.numbers;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Josephus
{
    static int josephus(int n, int k)
    {
        List<Integer> list = IntStream.rangeClosed(1, n).boxed().collect(Collectors.toList());
        int i = -1;
        while(list.size() > 1)
        {
            list.remove((i + k) % list.size());
            i = (i + k) % (list.size() + 1) - 1;
        }
        return list.get(0);
    }

    static boolean testsPass()
    {
        boolean check = josephus(5, 2) == 3;
        if(!check)
        {
            return false;
        }
        check = josephus(7, 3) == 4;
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
