using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace TextRotate_c
{
	public class Form1 : System.Windows.Forms.Form
	{
    Bitmap bmp; 
    Point UL, UR, BL;
    Rectangle InvRect;
    int Direction = -1;
    String s = "ROTATING TEXT";
    Font fnt = new Font("Arial", 12);

    private System.Windows.Forms.VScrollBar Skew;
    private System.Windows.Forms.Timer T1;
    private System.ComponentModel.IContainer components;

		public Form1()
		{
			InitializeComponent();

      Skew.Minimum = 50;
      Skew.Maximum = 250;
      Skew.SmallChange = 1;
      Skew.LargeChange = 10;
      Skew.Value = 150;

      using (Graphics G = this.CreateGraphics())
      {
        SizeF sz = G.MeasureString(s, fnt);
        bmp = new  Bitmap((int)sz.Width, (int)sz.Height);
      }

      for ( int k=0; k<bmp.Height; k++ )
      {
        for ( int j=0; j<bmp.Width; j++ )
          bmp.SetPixel(j, k, Color.White);
      }
      bmp.MakeTransparent(Color.White);

      UL = new Point(150, 150);
      UR = new Point(UL.X+bmp.Width, Skew.Value);
      BL = new Point(150, UL.Y+bmp.Height);
      InvRect = new  Rectangle(-UR.X, Skew.Minimum, 2*UR.X, Skew.Maximum);

      using (Graphics G = Graphics.FromImage(bmp))
      {
        G.SmoothingMode = SmoothingMode.AntiAlias;
        G.TextRenderingHint = TextRenderingHint.AntiAlias;
        G.DrawString(s, fnt, Brushes.Black, 0, 0);
      }

      this.SetStyle(ControlStyles.AllPaintingInWmPaint, true);
      this.SetStyle(ControlStyles.DoubleBuffer, true);

      T1.Interval=10; //milliseconds
      T1.Enabled=false;
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
      bmp.Dispose();
      fnt.Dispose();
			base.Dispose( disposing );
		}

		#region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
      this.components = new System.ComponentModel.Container();
      this.Skew = new System.Windows.Forms.VScrollBar();
      this.T1 = new System.Windows.Forms.Timer(this.components);
      this.SuspendLayout();
      // 
      // Skew
      // 
      this.Skew.Location = new System.Drawing.Point(352, 54);
      this.Skew.Name = "Skew";
      this.Skew.Size = new System.Drawing.Size(16, 264);
      this.Skew.TabIndex = 1;
      this.Skew.Scroll += new System.Windows.Forms.ScrollEventHandler(this.Skew_Scroll);
      // 
      // T1
      // 
      this.T1.Tick += new System.EventHandler(this.T1_Tick);
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(392, 373);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.Skew});
      this.MaximizeBox = false;
      this.MinimizeBox = false;
      this.Name = "Form1";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "Form1";
      this.Load += new System.EventHandler(this.Form1_Load);
      this.ResumeLayout(false);

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
      Point[] dest = {UL, UR, BL};

      // Draw the image mapped to the parallelogram.
      e.Graphics.DrawImage(bmp, dest);
      e.Graphics.DrawLine(Pens.Black, UL, BL+new Size(0, 20));
      if (T1.Enabled==false)
        T1.Enabled=true;
    }

    private void Skew_Scroll(object sender, 
                             System.Windows.Forms.ScrollEventArgs e)
    {
      UR.Y = Skew.Value;
    }

    private void T1_Tick(object sender, System.EventArgs e)
    {
      UR.X += Direction;
      if ( UR.X == UL.X + bmp.Width*Direction )
        Direction *=-1;

      Invalidate(InvRect);
    }

	}
}
