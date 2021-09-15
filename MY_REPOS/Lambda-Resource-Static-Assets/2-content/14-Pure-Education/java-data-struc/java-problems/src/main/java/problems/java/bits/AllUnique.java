package problems.java.bits;

public class AllUnique
{
    static boolean isAllUniqueLowerString(String s)
    {
        int check = 0;
        for(char c : s.toCharArray())
        {
            int val = c - 'a';
            if((check & (1 << val)) != 0)
            {
                return false;
            }
            check |= (1 << val);
        }
        return true;
    }

    static boolean testsPass()
    {
        boolean check = isAllUniqueLowerString("abcdefghijk");
        if(!check)
        {
            return false;
        }
        check = isAllUniqueLowerString("abcdefgajk");
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
