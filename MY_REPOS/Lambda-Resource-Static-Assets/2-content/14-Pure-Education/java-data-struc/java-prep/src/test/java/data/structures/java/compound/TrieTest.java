package data.structures.java.compound;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class TrieTest
{

  @Test
  public void search()
  {
    Trie trie = new Trie();

    trie.insert("to");
    trie.insert("tea");
    trie.insert("ted");
    trie.insert("ten");
    trie.insert("inn");
    trie.insert("into");

    assertTrue(trie.search("ten"));
    assertTrue(trie.search("into"));
    assertTrue(trie.search("to"));
    assertFalse(trie.search("te"));
    assertFalse(trie.search("in"));
    assertFalse(trie.search("int"));
  }

  @Test
  public void searchBFS()
  {
    Trie trie = new Trie();

    trie.insert("to");
    trie.insert("tea");
    trie.insert("ted");
    trie.insert("ten");
    trie.insert("teddy");
    trie.insert("tenor");

    List<String> result = trie.searchBFS("te");
    assertEquals(5, result.size());
    assertEquals("tea", result.get(0));
    assertEquals("ted", result.get(1));
    assertEquals("ten", result.get(2));
    assertEquals("teddy", result.get(3));
    assertEquals("tenor", result.get(4));
  }

  @Test
  public void searchBFS1()
  {
    Trie trie = new Trie();

    trie.insert("to");
    trie.insert("tea");
    trie.insert("ted");
    trie.insert("ten");
    trie.insert("teddy");
    trie.insert("tenor");

    List<String> result = trie.searchBFS1("te");
    assertEquals(5, result.size());
    assertEquals("tea", result.get(0));
    assertEquals("ted", result.get(1));
    assertEquals("ten", result.get(2));
    assertEquals("teddy", result.get(3));
    assertEquals("tenor", result.get(4));
  }

  @Test
  public void searchDFS()
  {
    Trie trie = new Trie();

    trie.insert("to");
    trie.insert("tea");
    trie.insert("ted");
    trie.insert("ten");
    trie.insert("teddy");
    trie.insert("tenor");

    List<String> result = trie.searchDFS("te");
    assertEquals(5, result.size());
    assertEquals("tea", result.get(0));
    assertEquals("ted", result.get(1));
    assertEquals("teddy", result.get(2));
    assertEquals("ten", result.get(3));
    assertEquals("tenor", result.get(4));
  }
}