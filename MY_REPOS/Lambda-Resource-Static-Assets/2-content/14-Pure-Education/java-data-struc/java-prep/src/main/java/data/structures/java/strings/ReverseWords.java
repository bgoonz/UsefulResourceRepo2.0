package data.structures.java.strings;

import java.util.Arrays;
import java.util.stream.Collectors;

public class ReverseWords
{
  private String sentence;

  public ReverseWords(String s)
  {
    sentence = s;
  }

  public String reverseWords()
  {
    String reverse = reverse(sentence);
    String[] words = reverse.split("\\s+");
    reverse(words);
    return Arrays.stream(words).collect(Collectors.joining(" "));
  }

  private String reverse(String s)
  {
    Character[] ar = s.chars().mapToObj(c ->(char)c).toArray(Character[]::new);
    reverse(ar);
    return Arrays.stream(ar).map(Object::toString).collect(Collectors.joining());
  }

  private static<T> void reverse(T[] ar)
  {
    int start = 0, end = ar.length - 1;
    while(start < end)
    {
      T tmp = ar[start];
      ar[start++] = ar[end];
      ar[end--] = tmp;
    }
  }
}
