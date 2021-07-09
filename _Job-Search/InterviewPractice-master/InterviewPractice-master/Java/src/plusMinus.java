import java.util.ArrayList;
import java.util.Scanner;

/**
 * Created by ahadsheriff on 6/11/16.
 */
public class plusMinus {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] input = new int[n];
        ArrayList<Integer> positive = new ArrayList<>();
        ArrayList<Integer> negative = new ArrayList<>();
        ArrayList<Integer> zero = new ArrayList<>();



        for (int i = 0; i < n; i++) {
            input[i] = sc.nextInt();
        }

        for (int j = 0; j < input.length; j++) {
            if (input[j] > 0) {
                positive.add(input[j]);
            }
            else if (input[j] < 0) {
                negative.add(input[j]);
            }
            else if (input[j] == 0) {
                zero.add(input[j]);
            }
        }

        double positiveRatio = (double) positive.size()/(double)n;
        double negatveRatio = (double) negative.size()/(double)n;
        double zeroRatio = (double) zero.size()/(double) n;


        System.out.printf("%.6f \n", positiveRatio);
        System.out.printf("%.6f \n", negatveRatio);
        System.out.printf("%.6f \n", zeroRatio);

    }
}
