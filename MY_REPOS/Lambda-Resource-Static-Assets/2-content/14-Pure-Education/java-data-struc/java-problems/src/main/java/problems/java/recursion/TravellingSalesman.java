package problems.java.recursion;

public class TravellingSalesman
{
    /*
    Let's consider 4 points: A, B, C, D
    Distances between these points may be represented by a 2-D array:
             A   B   C   D
        A:  {0, 20, 42, 25}
        B:  {20, 0, 30, 34}
        C:  {42, 30, 0, 10}
        D:  {25, 34, 10, 0}
    Thus:
        A -> B = 20, A -> C = 42, A -> D = 25
        B -> A = 20, B -> C = 30, B -> D = 34
        C -> A = 42, C -> B = 30, C -> D = 10
        D -> A = 25, D -> B = 34, D -> C = 10
    */

    static int VISITED_ALL;
    static int[][] MATRIX;

    static int tsp(int[][] matrix)
    {
        MATRIX = matrix;
        VISITED_ALL = (1 << MATRIX.length) - 1;
        return tsp(1, 0);
    }

    private static int tsp(int mask, int pos)
    {
        if(mask == VISITED_ALL)
        {
            return MATRIX[pos][0];
        }

        int min = Integer.MAX_VALUE;
        for(int city = 0; city < MATRIX.length; city++)
        {
            if((mask & (1 << city)) == 0)   // city not yet visited
            {
                int ans = MATRIX[pos][city] + tsp(mask | (1 << city), city);
                min = Math.min(min, ans);
            }
        }
        return min;
    }

    static boolean testsPass()
    {
        int[][] data1 = {
                {0, 20, 42, 25},
                {20, 0, 30, 34},
                {42, 30, 0, 10},
                {25, 34, 10, 0}
        };
        boolean check = tsp(data1) == 85;
        if(!check)
        {
            return false;
        }
        int[][] data2 = {
                {0, 12, 10, 19,  8},
                {12, 0,  3,  7,  2},
                {10, 3,  0,  6, 20},
                {19, 7,  6,  0,  4},
                { 8, 2, 20,  4,  0},
        };
        check = tsp(data2) == 32;
        if(!check)
        {
            return false;
        }
        int[][] data3 = {
                {0, 29, 82, 46, 68, 52, 72, 42},
                {29, 0, 55, 46, 42, 43, 43, 23},
                {82, 55, 0, 68, 46, 55, 23, 43},
                {46, 46, 68, 0, 82, 15, 72, 31},
                {68, 42, 46, 82, 0, 74, 23, 52},
                {52, 43, 55, 15, 74, 0, 61, 23},
                {72, 43, 23, 72, 23, 61, 0, 42},
                {42, 23, 43, 31, 52, 23, 42, 0}
        };
        check = tsp(data3) == 244;
        if(!check)
        {
            return false;
        }
//        int[][] data4 = {
//                {0, 29, 82, 46, 68, 52, 72, 42, 51, 55, 29, 74, 23, 72, 46},
//                {29, 0, 55, 46, 42, 43, 43, 23, 23, 31, 41, 51, 11, 52, 21},
//                {82, 55, 0, 68, 46, 55, 23, 43, 41, 29, 79, 21, 64, 31, 51},
//                {46, 46, 68, 0, 82, 15, 72, 31, 62, 42, 21, 51, 51, 43, 64},
//                {68, 42, 46, 82, 0, 74, 23, 52, 21, 46, 82, 58, 46, 65, 23},
//                {52, 43, 55, 15, 74, 0, 61, 23, 55, 31, 33, 37, 51, 29, 59},
//                {72, 43, 23, 72, 23, 61, 0, 42, 23, 31, 77, 37, 51, 46, 33},
//                {42, 23, 43, 31, 52, 23, 42, 0, 33, 15, 37, 33, 33, 31, 37},
//                {51, 23, 41, 62, 21, 55, 23, 33, 0, 29, 62, 46, 29, 51, 11},
//                {55, 31, 29, 42, 46, 31, 31, 15, 29, 0, 51, 21, 41, 23, 37},
//                {29, 41, 79, 21, 82, 33, 77, 37, 62, 51, 0, 65, 42, 59, 61},
//                {74, 51, 21, 51, 58, 37, 37, 33, 46, 21, 65, 0, 61, 11, 55},
//                {23, 11, 64, 51, 46, 51, 51, 33, 29, 41, 42, 61, 0, 62, 23},
//                {72, 52, 31, 43, 65, 29, 46, 31, 51, 23, 59, 11, 62, 0, 59},
//                {46, 21, 51, 64, 23, 59, 33, 37, 11, 37, 61, 55, 23, 59, 0},
//        };
//        check = tsp(data4) == 244;
//        if(!check)
//        {
//            return false;
//        }
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
