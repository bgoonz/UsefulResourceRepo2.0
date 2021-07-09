using System;
using System.Drawing;
using System.Drawing.Text;

namespace FontsClass_c
{

	public sealed class Fonts
	{
    private static PrivateFontCollection PFC;
    private static FontFamily Arial_FF;
    private static FontFamily Comic_FF;
    private static FontFamily Chain_FF;

    static Fonts()
		{
      PFC = new PrivateFontCollection();
      PFC.AddFontFile("C:\\WINNT\\Fonts\\Arial.ttf");
      Arial_FF = PFC.Families[0];
      PFC.AddFontFile("chainletters.ttf");
      Chain_FF = PFC.Families[1];
      PFC.AddFontFile("C:\\WINNT\\Fonts\\comic.ttf");
      Comic_FF = PFC.Families[2];
    }

    public static FontFamily[] Families
    {
      get{ return PFC.Families; }
    }

    #region Arial Font
    public static Font Arial_20
    {
      get {return new Font(Arial_FF, 20, FontStyle.Regular, GraphicsUnit.Point);}
    }
    public static Font ArialItalic_20
    {
      get {return new Font(Arial_FF, 20, FontStyle.Italic, GraphicsUnit.Point);}
    }
    #endregion

    #region Chain font
    public static Font Chain_20
    {
      get {return new Font(Chain_FF, 20, FontStyle.Regular, GraphicsUnit.Point);}
    }
    public static Font ChainItalic_20
    {
      get {return new Font(Chain_FF, 20, FontStyle.Italic, GraphicsUnit.Point);}
    }
    #endregion

    #region Comic Font
    public static Font Comic_20
    {
      get {return new Font(Comic_FF, 20, FontStyle.Regular, GraphicsUnit.Point);}
    }
    public static Font ComicItalic_20
    {
      get {return new Font(Comic_FF, 20, FontStyle.Italic, GraphicsUnit.Point);}
    }
    #endregion

	}
}
