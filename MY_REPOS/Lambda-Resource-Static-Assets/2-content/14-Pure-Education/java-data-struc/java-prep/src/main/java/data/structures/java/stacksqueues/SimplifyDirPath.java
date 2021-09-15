package data.structures.java.stacksqueues;

import org.apache.commons.lang3.StringUtils;
import java.util.Stack;

public class SimplifyDirPath
{
  public static String simplifyDirPath(String path)
  {
    String[] tokens = path.split("/");
    if(tokens.length == 0)
    {
      return path;
    }

    Stack<String> stack = new Stack<>();
    for(String token : tokens)
    {
      if(!StringUtils.isBlank(token) && !token.equals("."))
      {
        if(token.equals("..") && !stack.empty())
        {
          stack.pop();
        }
        else
        {
          stack.push(token);
        }
      }
    }

    StringBuilder sb = new StringBuilder();
    for(String s : stack)
    {
      sb.append("/");
      sb.append(s);
    }

    return sb.toString();
  }
}
