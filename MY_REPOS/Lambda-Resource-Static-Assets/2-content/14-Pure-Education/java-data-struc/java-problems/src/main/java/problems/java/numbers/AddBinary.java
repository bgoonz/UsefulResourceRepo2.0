package problems.java.numbers;

public class AddBinary
{
    /*
        https://github.com/wey068/Facebook-Interview-Coding/blob/master/67.%20Add%20Binary.java

        Input:  a = "11", b = "1"
        Result: "100".
     */

    static String addBinary(String s1, String s2)
    {
        StringBuilder result = new StringBuilder();

        int s1Pos = s1.length() - 1, s2Pos = s2.length() - 1;
        int carry = 0;
        while(s1Pos > -1 && s2Pos > -1)
        {
            int sum = s1.charAt(s1Pos--) - '0' + s2.charAt(s2Pos--) - '0' + carry;
            carry = sum / 2;
            result.append(sum % 2);
        }

        String rem = s1Pos > -1 ? s1.substring(0, s1Pos + 1) : s2.substring(0, s2Pos + 1);
        int pos = rem.length() - 1;
        while(pos > -1)
        {
            int sum = rem.charAt(pos--) - '0' + carry;
            carry = sum / 2;
            result.append(sum % 2);
        }

        if(carry > 0)
        {
            result.append(carry);
        }

        return result.reverse().toString();
    }

    static boolean testsPass()
    {
        boolean check = addBinary("110111", "11011").equals("1010010");
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
