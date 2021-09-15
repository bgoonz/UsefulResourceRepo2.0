import java.util.IntSummaryStatistics;

/**
 * Created by ahadsheriff on 5/18/16.
 */
public class Max {
    public static void main(String[] args) {
        // Don't forget about error checking!
        if (args.length > 0) {
            int sum = 0;
            for (String arg : args) {
                sum += Integer.parseInt(arg);
            }
            System.out.println(sum / args.length);
        }
    }
}
