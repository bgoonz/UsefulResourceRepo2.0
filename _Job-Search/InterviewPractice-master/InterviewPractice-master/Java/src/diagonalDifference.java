import java.util.Scanner;

/**
 * Created by ahadsheriff on 6/11/16.
 */



public class diagonalDifference {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int x;
        int y;

        int[][] grid = new int[n][n];

        for (x = 0; x < n; x++) {
            for (y = 0; y < n; y++) {
                // You must set the grid values equal to input
                grid[x][y] = sc.nextInt();
            }
        }

        int primary = 0;
        int secondary = 0;
        int sum;
        // set y equal to n-1 so that you can get the middle number
        y = n-1;

        for(int i = 0; i < n; i++) {
            // Over here you set the diagonals.
            primary += grid[i][i];
            secondary += grid[i][y];
            y--;
        }

        sum = primary-secondary;

        System.out.println(Math.abs(sum));

    }
}
