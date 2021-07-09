using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace AllCornerRect
{
	public class Form1 : System.Windows.Forms.Form
	{

    #region Class Local Variables

    RealRect MyRect;

    #endregion


		private System.ComponentModel.Container components = null;

		public Form1()
		{
			InitializeComponent();

      this.SetStyle( ControlStyles.AllPaintingInWmPaint, true);
      this.SetStyle( ControlStyles.DoubleBuffer, true);

      this.MouseDown  += new MouseEventHandler(this.M_down);
      this.MouseUp    += new MouseEventHandler(this.M_up);
      this.MouseMove  += new MouseEventHandler(this.M_move);

      MyRect = new RealRect();
    }

    protected override void Dispose( bool disposing )
    {
      if( disposing )
      {
        if (components != null) 
        {
          components.Dispose();
        }
      }
      base.Dispose( disposing );
    }

    #region Windows Form Designer generated code
    /// <summary>
    /// Required method for Designer support - do not modify
    /// the contents of this method with the code editor.
    /// </summary>
		private void InitializeComponent()
		{
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(320, 301);
      this.MaximizeBox = false;
      this.MinimizeBox = false;
      this.Name = "Form1";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "Form1";
      this.Load += new System.EventHandler(this.Form1_Load);

    }
		#endregion

		[STAThread]
		static void Main() 
		{
			Application.Run(new Form1());
		}

    private void Form1_Load(object sender, System.EventArgs e)
    {
    }

    protected override void OnPaint(PaintEventArgs e)
    {
      base.OnPaint(e);

      Graphics G = e.Graphics;

      G.DrawRectangle(Pens.Red, MyRect.Rect);
    }

    #region Squeek

    private void M_up(object sender, MouseEventArgs e)
    {
      Invalidate();
    }

    private void M_down(object sender, MouseEventArgs e)
    {
      if (e.Button != MouseButtons.Left)
        return;

      MyRect = new RealRect(e.X, e.Y);
    }

    private void M_move(object sender, MouseEventArgs e)
    {
      if (e.Button != MouseButtons.Left)
        return;

      MyRect.EndX = e.X;
      MyRect.EndY = e.Y;
      Invalidate();
    }

    #endregion
	}
}










