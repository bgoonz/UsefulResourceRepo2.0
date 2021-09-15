package data.structures.java.stacksqueues;

import data.structures.java.stacksqueues.StructuredOutline;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class StructuredOutlineTest
{
  StructuredOutline structuredOutline;
  @Before
  public void setUp() throws Exception
  {
    StructuredOutline.Heading h1_1 = new StructuredOutline.Heading(1, "h1_1");
    StructuredOutline.Heading h2_11 = new StructuredOutline.Heading(2, "h2_11");
    StructuredOutline.Heading h3_111 = new StructuredOutline.Heading(3, "h3_111");
    StructuredOutline.Heading h3_112 = new StructuredOutline.Heading(3, "h3_112");
    StructuredOutline.Heading h3_113 = new StructuredOutline.Heading(3, "h3_113");
    StructuredOutline.Heading h2_12 = new StructuredOutline.Heading(2, "h2_12");
    StructuredOutline.Heading h3_121 = new StructuredOutline.Heading(3, "h3_121");
    StructuredOutline.Heading h1_2 = new StructuredOutline.Heading(1, "h1_2");
    StructuredOutline.Heading h2_21 = new StructuredOutline.Heading(2, "h2_21");
    StructuredOutline.Heading h2_22 = new StructuredOutline.Heading(2, "h2_22");
    StructuredOutline.Heading h2_23 = new StructuredOutline.Heading(2, "h2_23");
    StructuredOutline.Heading h3_231 = new StructuredOutline.Heading(3, "h3_231");
    StructuredOutline.Heading h3_232 = new StructuredOutline.Heading(3, "h3_232");
    StructuredOutline.Heading h3_233 = new StructuredOutline.Heading(3, "h3_233");
    StructuredOutline.Heading h1_3 = new StructuredOutline.Heading(1, "h1_3");

    List<StructuredOutline.Heading> list = new ArrayList<>();
    list.add(h1_1);
    list.add(h2_11);
    list.add(h3_111);
    list.add(h3_112);
    list.add(h3_113);
    list.add(h2_12);
    list.add(h3_121);
    list.add(h1_2);
    list.add(h2_21);
    list.add(h2_22);
    list.add(h2_23);
    list.add(h3_231);
    list.add(h3_232);
    list.add(h3_233);
    list.add(h1_3);

    structuredOutline = new StructuredOutline(list);
  }

  @Test
  public void createOutline()
  {
    StructuredOutline.Node root = structuredOutline.createOutline();
    List<StructuredOutline.Node> h1Children = root.children;
    //  H1 Level
    assertEquals(3, h1Children.size());
    for(int i = 0; i < h1Children.size(); ++i)
    {
      StructuredOutline.Node n = h1Children.get(i);
      assertTrue(n.heading.text.equals("h1_1") || n.heading.text.equals("h1_2") || n.heading.text.equals("h1_3"));
    }

    //  H2 Level
    List<StructuredOutline.Node> h2_h11Children = h1Children.get(0).children;
    assertEquals(2, h2_h11Children.size());
    for(int i = 0; i < h2_h11Children.size(); ++i)
    {
      StructuredOutline.Node n = h2_h11Children.get(i);
      assertTrue(n.heading.text.equals("h2_11") || n.heading.text.equals("h2_12"));
    }

    List<StructuredOutline.Node> h2_h12Children = h1Children.get(1).children;
    assertEquals(3, h2_h12Children.size());
    for(int i = 0; i < h2_h12Children.size(); ++i)
    {
      StructuredOutline.Node n = h2_h12Children.get(i);
      assertTrue(n.heading.text.equals("h2_21") || n.heading.text.equals("h2_22") || n.heading.text.equals("h2_23"));
    }

    List<StructuredOutline.Node> h2_h13Children = h1Children.get(2).children;
    assertEquals(0, h2_h13Children.size());

    //  H3 Level
    List<StructuredOutline.Node> h3_h211Children = h2_h11Children.get(0).children;
    assertEquals(3, h3_h211Children.size());
    for(int i = 0; i < h3_h211Children.size(); ++i)
    {
      StructuredOutline.Node n = h3_h211Children.get(i);
      assertTrue(n.heading.text.equals("h3_111") || n.heading.text.equals("h3_112") || n.heading.text.equals("h3_113"));
    }

    List<StructuredOutline.Node> h3_h212Children = h2_h11Children.get(1).children;
    assertEquals(1, h3_h212Children.size());
    assertEquals("h3_121", h3_h212Children.get(0).heading.text);

    List<StructuredOutline.Node> h3_h223Children = h2_h12Children.get(2).children;
    assertEquals(3, h3_h223Children.size());
    {
      for(int i = 0; i < h3_h223Children.size(); ++i)
      {
        StructuredOutline.Node n = h3_h223Children.get(i);
        assertTrue(n.heading.text.equals("h3_231") || n.heading.text.equals("h3_232") || n.heading.text.equals("h3_233"));
      }
    }
  }
}