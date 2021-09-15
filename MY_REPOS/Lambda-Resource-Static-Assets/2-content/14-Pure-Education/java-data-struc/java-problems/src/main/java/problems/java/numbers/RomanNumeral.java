package problems.java.numbers;

public class RomanNumeral
{
    static String romanNumeral(int n)
    {
        String[] romSym = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        int[] decimals = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};

        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < decimals.length; ++i)
        {
            while(n >= decimals[i])
            {
                sb.append(romSym[i]);
                n -= decimals[i];
            }
            if(n == 0)
            {
                break;
            }
        }
        return sb.toString();
    }

    static boolean testsPass()
    {
        boolean check = romanNumeral(4998).equals("MMMMCMXCVIII");
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
