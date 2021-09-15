package problems.java.numbers;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class NumbersWithRepeatedDigits
{
    static int countNumbersWithRepeatedDigits(int n)
    {
        List<Integer> result = new ArrayList();

        for(int i = n; i > 10; --i)
        {
            int num = i;
            Set<Integer> set = new HashSet<>();
            while(num > 0)
            {
                int rem = num % 10;
                if(set.contains(rem))
                {
                    result.add(i);
                    break;
                }
                set.add(rem);
                num /= 10;
            }
        }

        return result.size();
    }

    static boolean testsPass()
    {
        boolean check = countNumbersWithRepeatedDigits(100) == 10;
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
