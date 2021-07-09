using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace Clipper_c
{
	/// <summary>
  ///  Copyright Nicholas Symmonds 2002
  /// This software is for instructional purposes only.
  /// It may not be sold as is.
	/// 
	/// This form is the one that holds the complete bitmap of the screen.  
	/// The border is set to nothing and the form is maximized.  The cursor 
	/// is also changed to tell the user (s)he can now drag a line and make 
	/// a capture box. When the screen is captured this form shows up almost 
	/// immediately.
	/// </summary>
	public class dtBitmap : Form
	{

    #region Class local storage

    private Bitmap bmp;
    private Rectangle InvalidRect = Rectangle.Empty;
    private Pen mRectPen;
    private Corectangle mbmpRect;

    #endregion

    
    public dtBitmap(Bitmap b)
    {
      mbmpRect = new  Corectangle();
      mRectPen = new Pen(Brushes.Red, 1);
      mRectPen.DashStyle = DashStyle.DashDot;
      bmp = b.Clone(new RectangleF(0, 0, b.Width, b.Height), b.PixelFormat);

      this.SetStyle(ControlStyles.AllPaintingInWmPaint,true);
      this.SetStyle(ControlStyles.DoubleBuffer,true);
      this.Size = bmp.Size;
      this.FormBorderStyle = FormBorderStyle.None;
      this.MaximizeBox = false;
      this.MinimizeBox = false;
      this.Cursor = new Cursor("hcross.cur");
      this.BackgroundImage = bmp;

      //Show as modal
      this.ShowDialog();
    }

    private void InitializeComponent()
    {
      // 
      // dtBitmap
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(292, 273);
      this.Name = "dtBitmap";
      this.Load += new System.EventHandler(this.dtBitmap_Load);
    }


    protected override void Dispose( bool disposing )
    {
      if( disposing )
      {
        if (bmp != null)
          bmp.Dispose();
      }
      base.Dispose( disposing );
    }

    public Bitmap GetBitmap
    {
      get{return bmp;}
    }

    private void dtBitmap_Load(object sender, System.EventArgs e)
    {
    }
    protected override void OnPaint(PaintEventArgs e)
    {
      base.OnPaint(e);
      e.Graphics.DrawRectangle(mRectPen, mbmpRect.Rect);
    }

    #region Squeek
    protected override void OnMouseDown(MouseEventArgs e)
    {
      base.OnMouseDown(e);

      if (e.Button != MouseButtons.Left)
        return;

      mbmpRect = new  Corectangle(e.X, e.Y);
    }

    protected override void OnMouseUp(MouseEventArgs e)
    {
      base.OnMouseUp(e);

      Invalidate();
      bmp = bmp.Clone(mbmpRect.Rect, bmp.PixelFormat);
      this.Close();
    }

    protected override void OnMouseMove(MouseEventArgs e)
    {
      base.OnMouseMove(e);

      if (e.Button != MouseButtons.Left)
        return;

      mbmpRect.EndX = e.X;
      mbmpRect.EndY = e.Y;
      Invalidate();
    }

    #endregion
	}
}
