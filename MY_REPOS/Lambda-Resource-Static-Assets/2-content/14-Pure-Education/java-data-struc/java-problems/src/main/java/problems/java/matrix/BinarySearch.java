package problems.java.matrix;

public class BinarySearch
{
    static int binarySearch(int[][] data, int val)
    {
        return binarySearch(data, 0, data.length * data[0].length - 1, val);
    }

    private static int binarySearch(int[][] data, int start, int end, int val)
    {
        int rows = data.length, cols = data[0].length;

        while(start <= end)
        {
            int mid = (start + end) / 2;
            int midVal = data[mid / rows][mid % cols];
            if(midVal == val)
            {
                return mid;
            }
            else if(midVal > val)
            {
                end = mid - 1;
            }
            else
            {
                start = mid + 1;
            }
        }
        return -1;
    }

    static boolean testsPass()
    {
        int[][] data = {
                {1, 3, 5},
                {7, 9, 11},
                {13, 15, 17}
        };
        int pos0 = binarySearch(data, 1);
        int pos7 = binarySearch(data, 15);
        int posNeg = binarySearch(data, 10);
        boolean check = pos0 == 0 && pos7 == 7 && posNeg == -1;
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
