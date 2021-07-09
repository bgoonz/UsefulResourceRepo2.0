/**
 * Created by ahadsheriff on 5/24/16.
 */

import java.io.*;
import java.util.*;
import java.util.regex.Matcher;

public class tryCatch {
    public static void main(String[] args) {
        try {
            Scanner sc = new Scanner(System.in);

            int n = Math.abs(sc.nextInt());
            int m = Math.abs(sc.nextInt());

            double z = Math.pow((double) n, (double) m);

            System.out.println(z);

        } catch (Exception e) {
            System.out.println("java.lang.Exception: n and p should be non-negative");
        }

    }
}
