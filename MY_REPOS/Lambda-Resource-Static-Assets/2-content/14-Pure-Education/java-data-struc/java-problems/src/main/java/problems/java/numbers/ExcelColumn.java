package problems.java.numbers;

public class ExcelColumn
{
    static String numberToExcelColumn(int n)
    {
        StringBuilder sb = new StringBuilder();


        while(n > 0)
        {
            int rem = n % 26;
            if(rem == 0)
            {
                sb.append('Z');
                n = n / 26 - 1;
            }
            else
            {
                sb.append((char)(rem - 1 + 'A'));
                n /= 26;
            }
        }
        return sb.reverse().toString();
    }

    static boolean testsPass()
    {
        boolean check = numberToExcelColumn(2).equals("B");
        if(!check)
        {
            return false;
        }
        check = numberToExcelColumn(26).equals("Z");
        if(!check)
        {
            return false;
        }
        check = numberToExcelColumn(27).equals("AA");
        if(!check)
        {
            return false;
        }
        check = numberToExcelColumn(52).equals("AZ");
        if(!check)
        {
            return false;
        }
        check = numberToExcelColumn(53).equals("BA");
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
