package problems.java.numbers;

public class ToBinary
{
    static String toBinary(int n)
    {
        StringBuilder sb = new StringBuilder();

        while(n > 0)
        {
            sb.append(n % 2);
            n /= 2;
        }
        return sb.reverse().toString();
    }

    static boolean testsPass()
    {
        boolean check = toBinary(14).equals("1110");
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
