package problems.java.recursion;

import java.util.ArrayList;
import java.util.List;

public class PhoneNumbers
{

    static int[][] MOVES = {{4,6},{6,8},{7,9},{4,8},{0,3,9},{},{1,7,0},{2,6},{1,3},{2,4}};

    static int countPhoneCombinationsWithKnight(int numDigits, int currentNum, int move)
    {
        if(move == numDigits)
        {
            return 1;
        }

        int count = 0;
        int[] currentMoves = MOVES[currentNum];
        for(int i = 0; i < currentMoves.length; ++i)
        {
            count += countPhoneCombinationsWithKnight(numDigits, currentMoves[i], move + 1);
        }
        return count;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    static List<String> keepPhoneNumbersWithKnight(int numDigits, int currentNum, int move)
    {
        List<String> result = new ArrayList<>();
        keepPhoneNumbersWithKnight(numDigits, currentNum, move, result, new StringBuilder());
        return result;
    }

    private static void keepPhoneNumbersWithKnight(int numDigits, int currentNum,
                                                   int move, List<String> result, StringBuilder sb)
    {
        if(move == numDigits)
        {
            result.add(sb.toString());
            return;
        }

        int[] currentMoves = MOVES[currentNum];
        for(int i = 0; i < currentMoves.length; ++i)
        {
            sb.delete(move, sb.length());
            sb.append(currentMoves[i]);
            keepPhoneNumbersWithKnight(numDigits, currentMoves[i], move + 1, result, sb);
        }
    }

    static boolean testsPass()
    {
        boolean check = countPhoneCombinationsWithKnight(10,0, 0) == 4608;
        if(!check)
        {
            return false;
        }
        check = countPhoneCombinationsWithKnight(2,0, 0) == 6;
        if(!check)
        {
            return false;
        }

        List<String> result = keepPhoneNumbersWithKnight(2, 0, 0);
        check = result.size() == 6;
        if(!check)
        {
            return false;
        }
        check = result.get(0).equals("40") && result.get(1).equals("43") && result.get(2).equals("49")
                && result.get(3).equals("61") && result.get(4).equals("67") && result.get(5).equals("60");
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
