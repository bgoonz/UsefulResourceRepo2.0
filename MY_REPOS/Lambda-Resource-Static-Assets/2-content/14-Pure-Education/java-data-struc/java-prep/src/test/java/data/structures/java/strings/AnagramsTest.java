package data.structures.java.strings;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;

public class AnagramsTest
{

  @Test
  public void isAnagram()
  {
    String a1 = "abcdefg", a2 = "gafbedc", a3 = "abcgfee";
    assertTrue(Anagrams.isAnagram(a1, a2));
    assertFalse(Anagrams.isAnagram(a1, a3));
  }

  @Test
  public void isAnagramUsingSort()
  {
    String a1 = "abcdefg", a2 = "gafbedc", a3 = "abcgfee";
    assertTrue(Anagrams.isAnagramUsingSort(a1, a2));
    assertFalse(Anagrams.isAnagramUsingSort(a1, a3));
  }

  @Test
  public void groupAnagrams()
  {
    String[] strs = {"abc", "acb", "bca", "klm", "lmk", "xyz", "zyx", "yxz"};
    Map<String, List<String>> anagrams = Anagrams.groupAnagrams(strs);
    List<String> list = anagrams.get("abc");
    assertEquals(3, list.size());
    assertTrue(list.contains("abc"));
    assertTrue(list.contains("acb"));
    assertTrue(list.contains("bca"));
    list = anagrams.get("klm");
    assertEquals(2, list.size());
    assertTrue(list.contains("klm"));
    assertTrue(list.contains("lmk"));
    list = anagrams.get("xyz");
    assertEquals(3, list.size());
    assertTrue(list.contains("xyz"));
    assertTrue(list.contains("zyx"));
    assertTrue(list.contains("yxz"));
  }

  @Test
  public void groupAnagramsWithStreams()
  {
    List<String> words = Arrays.asList("abc", "cba", "bac", "xyz", "xzy", "yxz", "yzx");
    Map<String,List<String>> map = Anagrams.groupAnagramsWithStreams(words);
    List<String> l1 = map.get("abc");
    assertEquals(3, l1.size());
    assertTrue(l1.contains("abc"));
    assertTrue(l1.contains("cba"));
    assertTrue(l1.contains("bac"));

    List<String> l2 = map.get("xyz");
    assertEquals(4, l2.size());
    assertTrue(l2.contains("xyz"));
    assertTrue(l2.contains("xzy"));
    assertTrue(l2.contains("yxz"));
    assertTrue(l2.contains("yzx"));
  }
}