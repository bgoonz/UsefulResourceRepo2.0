using System;
using System.Drawing;
using System.Drawing.Drawing2D;

namespace PathBlend_c
{
	/// <summary>
	/// This class acts a centroid for another shape
	/// There is no Dispose() method for this class because it consumes 
	/// no resources
	/// </summary>
	public class Centroid
	{
    const int w = 20;
    const int h = 20;

    private int m_StartX;   // Top left X
    private int m_StartY;   // Top left Y
    private Rectangle r;    // Rectangle that holds the circle

    #region Constructors / Destructors
    public Centroid()
    {
      m_StartX = 10;
      m_StartY = 10;
      r.X = 10;
      r.Y = 10;
      r.Width = w;
      r.Height = h;
    }

    public Centroid( int X, int Y )
    {
      m_StartX = X;
      m_StartY = Y;
      r.X = X;
      r.Y = Y;
      r.Width = w;
      r.Height = h;
    }
    #endregion

    #region Properties

    public int X
    {
      get { return m_StartX; }
      set 
      { 
        m_StartX = value;
        r.X = value;
      }
    }

    public int Y
    {
      get { return m_StartY; }
      set 
      { 
        m_StartY = value;
        r.Y = value;
      }
    }

    public Rectangle Rect
    {
      get { return r; }
    }
    public Point Center
    {
      get { return (new Point((r.Left+r.Width/2), r.Top+r.Height/2)); }
    }

    #endregion

    #region Methods

    public void Draw( Graphics G )
    {
      G.FillEllipse(Brushes.Aqua, r);
    }

    public bool Relocate( System.Windows.Forms.MouseEventArgs e )
    {
      if ( e.Button == System.Windows.Forms.MouseButtons.Left )
      {
        if ( (e.X > r.Left) && (e.X < r.Right) && 
             (e.Y > r.Top) &&  (e.Y < r.Bottom) )
        {
          //Must make the center of the rectangle = x,y
          //If you don't you will loose track of the ball
          r.X = e.X - r.Width/2;
          m_StartX = r.X;
          r.Y = e.Y - r.Height/2;
          m_StartY = r.Y;
          return(true);
        }
      }
      return(false);
    }

    #endregion
  
  }
}
