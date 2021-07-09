using System;
using System.Drawing;

namespace AllCornerRect
{

	public class RealRect
	{

    #region Class Local Variables

    private Point mStart;
    private Point mEnd;
    private Point mRealStart;
    private Point mRealEnd;
    private Size  mRealSize;
    private Rectangle mRect;

    #endregion


    public RealRect(int X, int Y)
		{
      mStart        = Point.Empty;
      mEnd          = Point.Empty;
      mRealStart    = Point.Empty;
      mRealEnd      = Point.Empty;
      mRealSize     = Size.Empty;

      mStart.X      = X;
      mStart.Y      = Y;
      mRealStart.X  = X;
      mRealStart.Y  = Y;

      mRect = Rectangle.Empty;

    }

    public RealRect()
    {
      mStart        = Point.Empty;
      mEnd          = Point.Empty;
      mRealStart    = Point.Empty;
      mRealEnd      = Point.Empty;
      mRealSize     = Size.Empty;

      mStart.X      = 0;
      mStart.Y      = 0;
      mRealStart.X  = 0;
      mRealStart.Y  = 0;

      mRect = Rectangle.Empty;
    }

    /// <summary>
    /// Ending X Value of rectangle
    /// </summary>
    public int EndX
    {
      set{ mEnd.X = value; }
    }

    /// <summary>
    /// Ending Y Value of rectangle
    /// </summary>
    public int EndY
    {
      set{ mEnd.Y = value; }
    }

    /// <summary>
    /// Get the corrected rectangle
    /// </summary>
    public Rectangle Rect
    {
      get
      { 
        MakeReal();
        mRect.Location = mRealStart;
        mRect.Size = mRealSize;
        return mRect; 
      }
    }

    private void MakeReal()
    {
      //Started top left, ended bottom right
      if (mEnd.X > mStart.X && mEnd.Y > mStart.Y)
      {
        mRealStart = mStart;
        mRealEnd = mEnd;
        mRealSize = new Size(mRealEnd.X-mRealStart.X, mRealEnd.Y-mRealStart.Y);
        return;
      }

      //Started bottom right, ended top left
      if (mEnd.X < mStart.X && mEnd.Y < mStart.Y)
      {
        mRealEnd = mStart;
        mRealStart = mEnd;
        mRealSize = new Size(mRealEnd.X-mRealStart.X, mRealEnd.Y-mRealStart.Y);
        return;
      }

      //Started top right left, ended bottom left
      if (mEnd.X < mStart.X && mEnd.Y > mStart.Y)
      {
        mRealStart.X = mEnd.X;
        mRealStart.Y = mStart.Y;
        mRealEnd.X   = mStart.X;
        mRealEnd.Y   = mEnd.Y;
        mRealSize = new Size(mRealEnd.X-mRealStart.X, mRealEnd.Y-mRealStart.Y);
        return;
      }

      //Started bottom left, ended top right
      if (mEnd.X > mStart.X && mEnd.Y < mStart.Y)
      {
        mRealStart.X = mStart.X;
        mRealStart.Y = mEnd.Y;
        mRealEnd.X   = mEnd.X;
        mRealEnd.Y   = mStart.Y;
        mRealSize = new Size(mRealEnd.X-mRealStart.X, mRealEnd.Y-mRealStart.Y);
        return;
      }
    }
  }
}
