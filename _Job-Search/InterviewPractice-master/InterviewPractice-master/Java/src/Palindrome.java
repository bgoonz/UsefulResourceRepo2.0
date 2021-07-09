import java.util.ArrayList;
import java.util.Scanner;
import java.util.function.BooleanSupplier;

/**
 * Created by ahadsheriff on 5/31/16.
 */
public class Palindrome {
    ArrayList<char[]> letters;

    public static void main(String[] args) {

        System.out.println(isPalindrome("not a palindrome"));
        System.out.println(isPalindrome("1738"));
        System.out.println(isPalindrome("1771"));
        System.out.println(isPalindrome("racecar"));
        System.out.println(isPalindrome("0"));
        System.out.println(isPalindrome("Amor, Roma"));
        System.out.println(isPalindrome("Was it a car or a cat I saw?"));
        System.out.println(isPalindrome("No ‘x’ in Nixon"));

        userInput();

    }

    public static void userInput () {
        Scanner sc = new Scanner(System.in);

        String input = sc.next();

        System.out.println(isPalindrome(input));
    }

    public static String reverse (String input) {
        char[] words = input.toCharArray();

        char store;
        int start = 0;
        int last = words.length-1;

        while (start > last) {
            store = words[start];
            words[last] = store;
            start++;
            last--;
        }

        return new String(words);

    }

    public static Boolean isPalindrome (String input) {

        if (input.equals(reverse(input))) {
            return true;
        }
        else {
            return false;
        }
    }

}
