package problems.java.numbers;

import java.util.Arrays;
import java.util.stream.Collectors;

public class BiggestFromArray
{
    public static int makeBiggestNumberFromIntArray(int[] a)
    {
        String[] vals = Arrays.stream(a).mapToObj(String::valueOf).toArray(String[]::new);
        Arrays.sort(vals, (v1, v2) -> {
            String leftRight = v1 + v2;
            String rightLeft = v2 + v1;
            return rightLeft.compareTo(leftRight);
        });

        String maxVal = Arrays.stream(vals).collect(Collectors.joining());
        return Integer.parseInt(maxVal);
    }

    static boolean testsPass()
    {
        boolean check = makeBiggestNumberFromIntArray(new int[] {7, 9, 91, 73}) == 991773;
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
