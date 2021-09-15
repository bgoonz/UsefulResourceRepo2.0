package problems.java.numbers;


public class Random7
{
    static int rand7UsingRand5()
    {
        while(true)
        {
            int r01 = rand5();
            if(r01 < 4)
            {
                int r = rand5() * 2 + r01 % 2;
                if(r < 7)
                {
                    return r;
                }
            }
        }
    }


    private static int rand5()
    {
        return (int)(Math.random() * 5);
    }

    static boolean testsPass()
    {
        for(int i = 0; i < 1000; ++i)
        {
            if(rand7UsingRand5() < 0 || rand7UsingRand5() > 6)
            {
                return false;
            }
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
