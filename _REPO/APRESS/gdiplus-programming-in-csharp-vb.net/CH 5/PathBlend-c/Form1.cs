using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace PathBlend_c
{

	public class Form1 : System.Windows.Forms.Form
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

    private Point CenterPoint;
    private Rectangle R;
    private Centroid Moon = new Centroid(50, 50);

		public Form1()
		{
			InitializeComponent();

      Graphics G = Graphics.FromHwnd(this.Handle);
      G.SmoothingMode=SmoothingMode.AntiAlias;

      this.SetStyle(ControlStyles.AllPaintingInWmPaint, true);
      this.SetStyle(ControlStyles.DoubleBuffer, true);
      this.SetStyle(ControlStyles.UserPaint, true);

      //Rectangle R holds the ellipse
      R = new Rectangle( this.Width/6, this.Height/6, 
                         this.Width/3*2, this.Height/3*2 );
      CenterPoint.X = Moon.X;
      CenterPoint.Y = Moon.Y;
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
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(292, 273);
      this.MinimizeBox = false;
      this.Name = "Form1";
      this.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Hide;
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "Moon Over Mars";
      this.Load += new System.EventHandler(this.Form1_Load);
      this.MouseMove += new 
                        System.Windows.Forms.MouseEventHandler(this.GetCoord);

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

    protected override void OnPaint( PaintEventArgs e)
    {
      GraphicsPath path = new GraphicsPath();
      path.AddEllipse( R );

      // Use the path to construct a path gradient brush.
      PathGradientBrush B = new PathGradientBrush(path);
      B.CenterColor = Color.Aqua;
      B.CenterPoint = CenterPoint;
      Color[] c = {Color.Red};

      B.SurroundColors = c;

      // Fill the path with the path gradient brush.
      e.Graphics.FillPath(B, path);

      Moon.Draw( e.Graphics );
    }

    private void GetCoord(object sender, System.Windows.Forms.MouseEventArgs e)
    {
      this.Invalidate(Moon.Rect);
      if ( Moon.Relocate(e) )
      {
        CenterPoint = Moon.Center;
        //Redraw the centroid
        this.Invalidate(Moon.Rect);
        //Redraw the main ellipse
        this.Invalidate( R );
      }
    }
	}
}
