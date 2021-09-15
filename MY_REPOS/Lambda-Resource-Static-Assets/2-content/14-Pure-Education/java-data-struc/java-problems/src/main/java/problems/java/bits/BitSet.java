package problems.java.bits;

public class BitSet
{
    private int[] data;
    public BitSet(int size)
    {
        data = new int[size / 32 + 1];
    }

    public void set(int pos)
    {
        int word = pos / 32;
        int bit = pos % 32;
        data[word] |= 1 << bit;
    }

    public boolean get(int pos)
    {
        int word = pos / 32;
        int bit = pos % 32;
        return (data[word] & (1 << bit)) != 0;
    }

    static boolean testsPass()
    {
        BitSet bitSet = new BitSet(500);
        bitSet.set(499);
        bitSet.set(498);
        bitSet.set(497);
        boolean check = bitSet.get(499);
        if(!check)
        {
            return false;
        }
        check = bitSet.get(498);
        if(!check)
        {
            return false;
        }
        check = bitSet.get(497);
        if(!check)
        {
            return false;
        }
        check = bitSet.get(0);
        if(check)
        {
            return false;
        }
        check = bitSet.get(1);
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
