package problems.java.strings;

public class CountAndSay
{
    static String countAndSay(int n)
    {
        StringBuilder sb = new StringBuilder();
        String s = String.valueOf(n);
        int count = 1;
        char lastChar = s.charAt(0);
        for(int i = 1; i < s.length(); ++i)
        {
            if(s.charAt(i) == lastChar)
            {
                count++;
            }
            else
            {
                sb.append(count);
                sb.append(lastChar);
                lastChar = s.charAt(i);
                count = 1;
            }
        }

        sb.append(count);
        sb.append(lastChar);

        return sb.toString();
    }

    static boolean testsPass()
    {
        String h = countAndSay(121);
        boolean check = countAndSay(121).equals("111211");
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
