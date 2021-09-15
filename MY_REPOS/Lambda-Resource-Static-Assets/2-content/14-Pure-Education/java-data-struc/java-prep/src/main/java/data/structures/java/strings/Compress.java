package data.structures.java.strings;

import java.util.Arrays;

public class Compress
{
  private String data;

  public Compress(String s)
  {
    data = s;
  }

  public String compress()
  {
    //  aaabbbbbcdddd -> a3b5c1d4
    if(countCompression() >= data.length())
    {
      return data;
    }

    char[] ar = data.toCharArray();
    char last = ar[0];
    int count = 1;
    StringBuilder sb = new StringBuilder();

    for(int i = 1; i < ar.length; ++i)
    {
      if(ar[i] == last)
      {
        count++;
      }
      else
      {
        sb.append(last);
        sb.append(count);
        count = 1;
        last = ar[i];
      }
    }

    sb.append(last);
    sb.append(count);

    return sb.toString();
  }

  public static String decompress(String s)
  {
    //  a3b12c2 -> aaabbbbbbbbbbbbcc
    String[] letters = s.split("[1-9]+");
    String[] numbers = s.split("[a-zA-Z]+");
    numbers = Arrays.copyOfRange(numbers, 1, numbers.length);

    StringBuilder sb = new StringBuilder();
    for(int i = 0; i < letters.length; ++i)
    {
      int n = Integer.parseInt(numbers[i]);
      char[] ar = new char[n];
      Arrays.fill(ar, letters[i].charAt(0));
      sb.append(ar);
    }
    return sb.toString();
  }

  private int countCompression()
  {
    char [] ar = data.toCharArray();
    char last = ar[0];
    int count = 1, size = 0;

    for(int i = 1; i < ar.length; ++i)
    {
      if(ar[i] == last)
      {
        count++;
      }
      else
      {
        size += 1 + String.valueOf(count).length();
        count = 1;
        last = ar[i];
      }
    }
    size += 1 + String.valueOf(count).length();
    return size;
  }
}
