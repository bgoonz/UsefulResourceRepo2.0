package problems.java.companies.facebook.strings;

public class RotationalCipher
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=238827593802550

    One simple way to encrypt a string is to "rotate" every alphanumeric character by a certain amount.
    Rotating a character means replacing it with another character that is a certain number of steps away
    in normal alphabetic or numerical order.
    For example, if the string "Zebra-493?" is rotated 3 places, the resulting string is "Cheud-726?"
    Examples:                   Example:
        input = Zebra-493?          input = abcdefghijklmNOPQRSTUVWXYZ0123456789
        rotationFactor = 3          rotationFactor = 39
        output = Cheud-726?         output = nopqrstuvwxyzABCDEFGHIJKLM9012345678

    */

    static String rotationalCipher(String input, int rotationFactor)
    {
        StringBuilder sb = new StringBuilder();
        for(char c : input.toCharArray())
        {
            if(Character.isAlphabetic(c))
            {
                if(Character.isUpperCase(c))
                {
                    sb.append((char)((c + rotationFactor - 'A') % 26 + 'A'));
                }
                else
                {
                    sb.append((char)((c + rotationFactor - 'a') % 26 + 'a'));
                }

            }
            else if(Character.isDigit(c))
            {
                sb.append((char)((c + rotationFactor - '0') % 10 + '0'));
            }
            else
            {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    static boolean testsPass()
    {
        boolean check = rotationalCipher("Zebra-493?", 3).equals("Cheud-726?");
        if(!check)
        {
            return false;
        }
        check = rotationalCipher("abcdefghijklmNOPQRSTUVWXYZ0123456789", 39)
                .equals("nopqrstuvwxyzABCDEFGHIJKLM9012345678");
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
