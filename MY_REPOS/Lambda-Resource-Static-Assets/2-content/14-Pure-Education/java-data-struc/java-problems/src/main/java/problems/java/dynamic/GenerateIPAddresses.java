package problems.java.dynamic;

import java.util.ArrayList;
import java.util.List;

public class GenerateIPAddresses
{
    static List<String> generate(String address)
    {
        List<String> result = new ArrayList<>();

        int len = address.length();
        if(len < 4 || len > 12)
        {
            return result;
        }

        String candidate = address;
        for(int i = 1; i < len - 2; ++i)
        {
            for(int j = i + 1; j < len - 1; ++j)
            {
                for(int k = j + 1; k < len; ++k)
                {
                    candidate = candidate.substring(0, k) + '.' + candidate.substring(k);
                    candidate = candidate.substring(0, j) + '.' + candidate.substring(j);
                    candidate = candidate.substring(0, i) + '.' + candidate.substring(i);
                    if(isValid(candidate))
                    {
                        result.add(candidate);
                    }
                    candidate = address;
                }
            }
        }
        return result;
    }

    private static boolean isValid(String ip)
    {
        String[] a = ip.split("\\.");
        for(String s : a)
        {
            int val = Integer.parseInt(s);
            if(val < 0 || val > 255)
            {
                return false;
            }
            if(s.length() > 1 && val == 0)
            {
                return false;
            }
            if(s.length() > 1 && val != 0 && s.charAt(0) == '0')
            {
                return false;
            }
        }
        return true;
    }

    static boolean testsPass()
    {
        List<String> result = generate("25525511135");
        boolean check = result.get(0).equals("255.255.11.135") &&
                result.get(1).equals("255.255.111.35");
        if(!check)
        {
            return false;
        }
        result = generate("1111");
        check = result.get(0).equals("1.1.1.1");
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
