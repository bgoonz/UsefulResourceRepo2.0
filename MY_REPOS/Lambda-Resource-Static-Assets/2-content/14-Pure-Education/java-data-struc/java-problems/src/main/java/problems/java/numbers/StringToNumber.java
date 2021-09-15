package problems.java.numbers;

public class StringToNumber
{
    static int numericStringToNum(String s)
    {
        int val = 0;
        for(char c : s.toCharArray())
        {
            val = val * 10 + c - '0';
        }
        return val;
    }

    static boolean testsPass()
    {
        boolean check = 12345 == numericStringToNum("12345");
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
