package data.structures.java.recursion.backtracking;

import java.util.ArrayList;
import java.util.List;

public class GenerateIPAddresses
{
  /*
  Consider input: "25525511135" which may also contain fewer characters, i.e. "1111"
  We want to place "." in between and patternMatch if it constitutes a valid IP address.
  For example:
    "2.5.5.25511135"
    "2.5.52.5511135"
    "2.5.525.511135"
    ...
    "255.255.11.135 //  Valid"
   */
  private String address;

  public GenerateIPAddresses(String address)
  {
    this.address = address;
  }

  public List<String> generate()
  {
    List<String> result = new ArrayList<>();
    if(address.length() < 3 || address.length() > 12)
    {
      return result;
    }

    int size = address.length();

    String newAddress = address;
    for(int i = 1; i < size - 2; ++i)
    {
      for(int j = i + 1; j < size - 1; ++j)
      {
        for(int k = j + 1; k < size; ++k)
        {
          newAddress = newAddress.substring(0, k) + "." + newAddress.substring(k);
          newAddress = newAddress.substring(0, j) + "." + newAddress.substring(j);
          newAddress = newAddress.substring(0, i) + "." + newAddress.substring(i);

          if(isValid(newAddress))
          {
            result.add(newAddress);
          }
          newAddress = address;
        }
      }
    }

    return result;
  }

  private static boolean isValid(String ip)
  {
    String[] ar = ip.split("\\.");
    for(String s : ar)
    {
      int val = Integer.parseInt(s);
      if(s.length() > 3 || val < 0 || val > 255)
      {
        return false;
      }
      if(s.length() > 1 && val == 0)
      {
        return false;
      }
      if(s.length() > 1 && val != 0 && s.charAt(0) == '0')
      {
        return false;
      }
    }
    return true;
  }
}
