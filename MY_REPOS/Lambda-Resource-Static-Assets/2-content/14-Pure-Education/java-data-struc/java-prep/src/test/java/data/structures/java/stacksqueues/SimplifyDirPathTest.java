package data.structures.java.stacksqueues;

import org.junit.Test;

import static org.junit.Assert.*;

public class SimplifyDirPathTest
{

  @Test
  public void simplifyDirPath()
  {
    assertEquals("/c", SimplifyDirPath.simplifyDirPath("/a/./b/../../c/"));
    assertEquals("/home/foo", SimplifyDirPath.simplifyDirPath("/home//foo/"));
  }
}