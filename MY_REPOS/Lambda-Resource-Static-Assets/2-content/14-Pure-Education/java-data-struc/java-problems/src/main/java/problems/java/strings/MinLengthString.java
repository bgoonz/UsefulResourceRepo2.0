package problems.java.strings;

public class MinLengthString
{
//    You are given two strings s and t.
//    You can select any substring of string s and rearrange the characters of the selected substring.
//    Determine the minimum length of the substring of s such that string t is a substring of the selected substring.
//    Example                     Example
//    s = "ddcbefebce"            s = "dcbefedfe"
//    t = "fd"                    t = "fd"'
//    output = 5                  output = 2
//    Substring "dcbef" can be rearranged to "cfdeb", "cefdb", and so on. String t is a substring of "cfdeb".
//    Thus, the minimum length required is 5.

    static int minLengthSubstring(String s, String t)
    {
        if(t.length() == 1 && s.indexOf(t.charAt(0)) != -1)
        {
            return 1;
        }
        int min = Integer.MAX_VALUE;

        String check = t;
        for(int i = 0; i < s.length() - 1; ++i)
        {
            int index = check.indexOf(s.charAt(i));
            if(index != -1)
            {
                check = check.substring(0, index) + check.substring(index + 1);
            }
            for(int j = i + 1; j < s.length(); ++j)
            {
                index = check.indexOf(s.charAt(j));
                if(index != -1)
                {
                    check = check.substring(0, index) + check.substring(index + 1);
                    if(check.length() == 0)
                    {
                        min = Math.min(min, j - i + 1);
                        check = t;
                        break;
                    }
                }
            }
        }

        return min;
    }

    static boolean testsPass()
    {
        boolean check = minLengthSubstring("ddcbefebce", "fd") == 5;
        if(!check)
        {
            return false;
        }

        check = minLengthSubstring("abxcdyefzghij", "zyx") == 7;
        if(!check)
        {
            return false;
        }

        check = minLengthSubstring("dcbefedfe", "fd") == 2;
        if(!check)
        {
            return false;
        }

        check = minLengthSubstring("dcbefedfe", "f") == 1;
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
