package data.structures.java.stacksqueues;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class QueueUsingTwoStacksTest
{
  QueueUsingTwoStacks<Integer> queueUsingTwoStacks;
  @Before
  public void setUp() throws Exception
  {
    queueUsingTwoStacks = new QueueUsingTwoStacks<>();
  }

  @Test
  public void size()
  {
    assertEquals(0, queueUsingTwoStacks.size());
  }

  @Test
  public void add()
  {
    queueUsingTwoStacks.add(1);
    queueUsingTwoStacks.add(2);
    assertEquals(2, queueUsingTwoStacks.size());
  }


  @Test
  public void remove()
  {
    queueUsingTwoStacks.add(1);
    queueUsingTwoStacks.add(2);
    assertEquals(2, queueUsingTwoStacks.size());
    assertEquals(Integer.valueOf(1), queueUsingTwoStacks.remove());
    assertEquals(Integer.valueOf(2), queueUsingTwoStacks.remove());
    assertEquals(0, queueUsingTwoStacks.size());
  }
}