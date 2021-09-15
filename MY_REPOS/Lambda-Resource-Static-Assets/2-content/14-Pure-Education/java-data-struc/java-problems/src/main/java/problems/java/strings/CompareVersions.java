package problems.java.strings;

public class CompareVersions
{
    static int compareVersions(String v1, String v2)
    {
        String[] a1 = v1.split("\\.");
        String[] a2 = v2.split("\\.");

        int i = 0;
        while(i < a1.length || i < a2.length)
        {
            if(i < a1.length && i < a2.length)
            {
                if(!a1[i].equals(a2[i]))
                {
                    return a1[i].compareTo(a2[i]);
                }
            }
            else if(i < a1.length)
            {
                if(Integer.parseInt(a1[i]) > 0)
                {
                    return 1;
                }
            }
            else if(i < a2.length)
            {
                if(Integer.parseInt(a2[i]) > 0)
                {
                    return -1;
                }

            }
            i++;
        }
        return 0;
    }

    static boolean testsPass()
    {
        boolean check = compareVersions("1.1.2.0", "1.1.2") == 0;
        if(!check)
        {
            return false;
        }
        check = compareVersions("1.1.2.0.4", "1.1.2.1") == -1;
        if(!check)
        {
            return false;
        }
        check = compareVersions("1.1.2.3.4", "1.1.2.3") == 1;
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
