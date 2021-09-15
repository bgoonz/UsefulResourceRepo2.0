package data.structures.java.bits;

public class BitSet
{
  int[] bitSet;
  public BitSet(int size)
  {
    bitSet = new int[size / 32 + 1];
  }

  public void set(int pos)
  {
    int word = pos / 32;
    int bit = pos % 32;
    bitSet[word] |= 1 << bit;
  }

  public boolean get(int pos)
  {
    int word = pos / 32;
    int bit = pos % 32;
    return (bitSet[word] & (1 << bit)) > 0;
  }
}
