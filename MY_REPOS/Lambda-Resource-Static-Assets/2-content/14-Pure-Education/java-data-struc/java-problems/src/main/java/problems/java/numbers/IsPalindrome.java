package problems.java.numbers;

public class IsPalindrome
{
    static boolean isPalindrome(int n)
    {
        int original = n;
        int reverse = 0;
        while(n > 0)
        {
            reverse = reverse * 10 + n % 10;
            n /= 10;
        }
        return original == reverse;
    }

    static boolean testsPass()
    {
        boolean check = isPalindrome(123321);
        if(!check)
        {
            return false;
        }
        check = isPalindrome(12345);
        if(check)
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
