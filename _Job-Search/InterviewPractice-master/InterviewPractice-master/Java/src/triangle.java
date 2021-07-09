/**
 * Created by ahadsheriff on 9/1/16.
 */

import com.sun.deploy.util.StringUtils;

import java.util.*;

public class triangle {

    public static void drawTriangle(int size) {
        int iterations = (size/2) + 1;
        int lineLen = 1;

        for (int i = 0; i < iterations; i++) {
            for (int spaces = 0; spaces <= size - lineLen; spaces++) {
                System.out.print(" ");
            }
            for (int hashes = 0; hashes < lineLen; hashes++) {
                System.out.print("#");
            }
            System.out.println();
            lineLen += 2;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        drawTriangle(1);
        drawTriangle(4);
        drawTriangle(6);
    }
}
