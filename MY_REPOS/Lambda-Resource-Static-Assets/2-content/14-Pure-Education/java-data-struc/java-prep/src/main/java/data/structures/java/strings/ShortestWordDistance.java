package data.structures.java.strings;

public class ShortestWordDistance
{
  //  Given a list of words and two words word1 and word2,
  //  return the shortest distance between these two words in the list.
  //  words = ["practice", "makes", "perfect", "coding", "makes"]
  //  word1 =  "coding", word2 = "practice" ==> 3
  //  word1 =  "makes", word2 = "coding" ==> 1

  public static int shortestDistance(String[] words, String word1, String word2)
  {
    int word1Pos = -1;
    int word2Pos = -1;

    int min = Integer.MAX_VALUE;
    for(int i = 0; i < words.length; ++i)
    {
      String word = words[i];
      if(word.equals(word1))
      {
        word1Pos = i;
        if(word2Pos != -1)
        {
          min = Math.min(min, word1Pos - word2Pos);
        }
      }
      else if(word.equals(word2))
      {
        word2Pos = i;
        if(word1Pos != -1)
        {
          min = Math.min(min, word2Pos - word1Pos);
        }
      }
    }
    return min;
  }
}
