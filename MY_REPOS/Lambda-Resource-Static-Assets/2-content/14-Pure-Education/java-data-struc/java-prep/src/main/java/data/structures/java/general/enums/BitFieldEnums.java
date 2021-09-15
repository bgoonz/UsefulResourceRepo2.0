package data.structures.java.general.enums;

import java.util.EnumSet;
import java.util.Set;

public class BitFieldEnums
{
  public enum Style {BOLD, ITALIC, UNDERLINE, STRIKETHROUGH};
  public static void applyStyles(Set<Style> styles)
  {
    System.out.println(styles);
  }

  public static void main(String[] args)
  {
    BitFieldEnums.applyStyles(EnumSet.of(Style.BOLD, Style.UNDERLINE));
  }
}
