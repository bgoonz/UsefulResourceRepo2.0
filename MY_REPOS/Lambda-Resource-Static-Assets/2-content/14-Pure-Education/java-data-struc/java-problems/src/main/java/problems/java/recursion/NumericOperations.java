package problems.java.recursion;

public class NumericOperations
{
    public static int gcd(int a, int b)
    {
        if(b == 0)
        {
            return a;
        }
        return gcd(b, a % b);
    }

    static int add(int a, int b)
    {
        if(b == 0)
        {
            return a;
        }

        int sum = a ^ b;
        int carry = (a & b) << 1;
        return add(sum, carry);

    }

    static int multiply(int a, int b)
    {
        if(b == 0)
        {
            return 0;
        }
        if(b % 2 == 0)
        {
            return multiply(a + a, b / 2);
        }
        else
        {
            return multiply(a + a, b / 2) + a;
        }
    }

    static int exponent(int a, int b)
    {
        if(b == 0)
        {
            return 1;
        }
        if(b % 2 == 0)
        {
            return exponent(a * a, b / 2);
        }
        else
        {
            return exponent(a * a, b / 2) * a;
        }
    }

    static String toBinary(int n, StringBuilder sb)
    {
        if(n == 0)
        {
            return "";
        }
        toBinary(n / 2, sb);
        sb.append(n % 2);
        return sb.toString();
    }

    static boolean testsPass()
    {
        boolean check = gcd(8, 36) == 4;
        if(!check)
        {
            return false;
        }
        check = add(159, 37) == 196;
        if(!check)
        {
            return false;
        }
        check = multiply(12, 19) == 228;
        if(!check)
        {
            return false;
        }
        check = exponent(2, 10) == 1024;
        if(!check)
        {
            return false;
        }
        check = toBinary(55, new StringBuilder()).equals("110111");
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
