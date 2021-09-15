package problems.java.bits;

import java.util.Arrays;

public class ActiveInactiveCells
{
    //  Cells: {1, 0, 0, 0, 0, 1, 0, 0}, Days: 1 ==> {0, 1, 0, 0, 1, 0, 1, 0}
    //  Cells: {1, 1, 1, 0, 1, 1, 1, 1}, Days: 2 ==> {0, 0, 0, 0, 0, 1, 1, 0}
    //  Assume cell on left and right is 0

    static int[] switchCells(int[] cells, int days)
    {
        int[] temp = new int[cells.length + 2];
        System.arraycopy(cells, 0, temp, 1, cells.length);
        int[] result = new int[cells.length];

        for(int i = 0; i < days; ++i)
        {
            for(int j = 0; j < temp.length - 2; ++j)
            {
                result[j] = temp[j] ^ temp[j + 2];
            }
            System.arraycopy(result, 0, temp, 1, result.length);
        }
        return result;
    }

    static boolean testsPass()
    {
        boolean check = Arrays.equals(new int[] {0, 1, 0, 0, 1, 0, 1, 0},
                switchCells(new int[] {1, 0, 0, 0, 0, 1, 0, 0}, 1 ));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {0, 0, 0, 0, 0, 1, 1, 0},
                switchCells(new int[] {1, 1, 1, 0, 1, 1, 1, 1}, 2 ));
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
