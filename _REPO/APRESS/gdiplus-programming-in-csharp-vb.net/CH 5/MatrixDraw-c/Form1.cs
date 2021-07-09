using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace MatrixDraw_c
{

  public class Form1 : System.Windows.Forms.Form
	{
    internal System.Windows.Forms.HScrollBar rotate;
    internal System.Windows.Forms.VScrollBar xlate;
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

    int XlateY;
    float Angle;
    Rectangle DrawingRect = new Rectangle(25, 25, 225, 225);


		public Form1()
		{
			//
			// Required for Windows Form Designer support
			//
			InitializeComponent();

      Angle = 0;
      XlateY = 0;
      xlate.Minimum = -50;
      xlate.Maximum = 50;
      xlate.SmallChange = 1;
      xlate.LargeChange = 5;
      xlate.Value = 0;

      rotate.Minimum = -180;
      rotate.Maximum = 180;
      rotate.SmallChange = 1;
      rotate.LargeChange = 10;
      rotate.Value = 0;

      this.SetStyle(ControlStyles.AllPaintingInWmPaint, true);
      this.SetStyle(ControlStyles.DoubleBuffer, true);
      this.SetStyle(ControlStyles.UserPaint, true);
    }

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
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
      this.rotate = new System.Windows.Forms.HScrollBar();
      this.xlate = new System.Windows.Forms.VScrollBar();
      this.SuspendLayout();
      // 
      // rotate
      // 
      this.rotate.Location = new System.Drawing.Point(8, 240);
      this.rotate.Name = "rotate";
      this.rotate.Size = new System.Drawing.Size(240, 16);
      this.rotate.TabIndex = 3;
      this.rotate.Scroll += new System.Windows.Forms.ScrollEventHandler(this.rotate_Scroll);
      // 
      // xlate
      // 
      this.xlate.Location = new System.Drawing.Point(264, 32);
      this.xlate.Name = "xlate";
      this.xlate.Size = new System.Drawing.Size(16, 200);
      this.xlate.TabIndex = 2;
      this.xlate.Scroll += new System.Windows.Forms.ScrollEventHandler(this.xlate_Scroll);
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(292, 273);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.rotate,
                                                                  this.xlate});
      this.MaximizeBox = false;
      this.MinimizeBox = false;
      this.Name = "Form1";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "Form1";
      this.Load += new System.EventHandler(this.Form1_Load);
      this.ResumeLayout(false);

    }
		#endregion

		/// <summary>
		/// The main entry point for the application.
		/// </summary>
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
      Graphics G  = e.Graphics;

      G.SmoothingMode = SmoothingMode.AntiAlias;

      // Create a graphics path, add a rectangle, set colors
      GraphicsPath Path = new GraphicsPath();
      Path.AddRectangle(new Rectangle(75, 100, 100, 75));
      PointF[] Pts  = Path.PathPoints;
      PathGradientBrush B = new PathGradientBrush(Pts);
      B.CenterColor = Color.Aqua;
      Color[] SColor = {Color.Blue};
      B.SurroundColors = SColor;

      //We will translate the brush!  NOT the rectangle!
      Matrix m = new Matrix();
      m.Translate(0, XlateY, MatrixOrder.Append);
      m.RotateAt(Angle, B.CenterPoint, MatrixOrder.Append);
      B.MultiplyTransform(m, MatrixOrder.Append);
      G.FillRectangle(B, DrawingRect);

      base.OnPaint(e);
      m.Dispose();
      B.Dispose();
      Path.Dispose();
    }

    private void xlate_Scroll(object sender, 
                              System.Windows.Forms.ScrollEventArgs e)
    {
      XlateY = xlate.Value;
      this.Invalidate(DrawingRect);
    }

    private void rotate_Scroll(object sender, 
                               System.Windows.Forms.ScrollEventArgs e)
    {
      Angle = rotate.Value;
      this.Invalidate(DrawingRect);
    }
	}
}
