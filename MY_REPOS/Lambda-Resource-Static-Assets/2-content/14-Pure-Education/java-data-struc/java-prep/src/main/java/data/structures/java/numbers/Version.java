package data.structures.java.numbers;

public class Version
{
  public static int compareVersions(String v1, String v2)
  {
    String[] ar1 = v1.split("\\.");
    String[] ar2 = v2.split("\\.");

    int i = 0;
    while(i < ar1.length || i < ar2.length)
    {
      if(i < ar1.length && i < ar2.length)
      {
        int val = Integer.parseInt(ar1[i]) - Integer.parseInt(ar2[i]);
        if(val < 0)
        {
          return -1;
        }
        if(val > 0)
        {
          return 1;
        }
      }
      else if(i < ar1.length)
      {
        if(Integer.parseInt(ar1[i]) != 0)
        {
          return 1;
        }
      }
      else if(i < ar2.length)
      {
        if(Integer.parseInt(ar2[i]) != 0)
        {
          return -1;
        }
      }
      i++;
    }

    return 0;
  }
}
