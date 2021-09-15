package problems.java.strings;

public class Rotation
{
    static boolean isRotation(String s1, String s2)
    {
        String s3 = s1 + s1;
        return s3.contains(s2);
    }

    static boolean testsPass()
    {
        String s1 = "abcdefgh";
        String s2 = "cdefghab";
        String s3 = "hgfedcba";
        boolean check = isRotation(s1, s2);
        if(!check)
        {
            return false;
        }
        check = isRotation(s2, s1);
        if(!check)
        {
            return false;
        }
        check = isRotation(s1, s3);
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
