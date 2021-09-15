package problems.java.numbers;

public class NumberToWords
{
    static String[] numNames = {
            "",
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "ten",
            "eleven",
            "twelve",
            "thirteen",
            "fourteen",
            "fifteen",
            "sixteen",
            "seventeen",
            "eighteen",
            "nineteen"
    };
    static String[] tenNames = {
            "",
            "ten",
            "twenty",
            "thirty",
            "forty",
            "fifty",
            "sixty",
            "seventy",
            "eighty",
            "ninety",
    };
    static String[] bigNumNames = {
            "",
            "thousand",
            "million",
            "billion",
            "trillion",
            "quadrillion",
            "quintillion"
    };

    static String convert(long num)
    {
        if(num == 0)
        {
            return "zero";
        }
        String prefix = "";

        if(num < 0)
        {
            prefix = "negative";
            num = -num;
        }

        String current = "";
        int bigNumPlace = 0;

        do
        {
            long n = num % 1000;
            if(n != 0)
            {
                String s = convertLessThan1000(n);
                current = s + bigNumNames[bigNumPlace++] + current;
            }
            num /= 1000;
        } while(num > 0);
        return prefix + current;
    }

    private static String convertLessThan1000(long n)
    {
        if(n < 100)
        {
            return convertLessThan100(n);
        }
        return numNames[(int)(n / 100)] + "hundred" + convertLessThan100(n % 100);
    }

    private static String convertLessThan100(long n)
    {
        if(n < 20)
        {
            return convertLessThan20(n);
        }
        return tenNames[(int)(n / 10)] + convertLessThan20(n % 10);
    }

    private static String convertLessThan20(long n)
    {
        return numNames[(int)n];
    }

    static boolean testsPass()
    {
        boolean check = convert(-12_345_678_901L).equals("negativetwelvebillionthreehundredfortyfivemillionsixhundredseventyeightthousandninehundredone");
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
