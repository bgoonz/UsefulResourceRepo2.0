using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace CustomCap_c
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

		public Form1()
		{
			//
			// Required for Windows Form Designer support
			//
			InitializeComponent();

			//
			// TODO: Add any constructor code after InitializeComponent call
			//
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
      this.Name = "Form1";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "Form1";
      this.Load += new System.EventHandler(this.Form1_Load);

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

    protected override void OnPaint ( PaintEventArgs e )
    {
      Graphics G = e.Graphics;
      Pen P = new Pen(Color.Blue, 1 );
      Point[] Pts = { new Point( 10, 10 ),
                      new Point( 15, 10 ),
                      new Point( 20, 15 ),
                      new Point( 20, 20 ),
                      new Point( 15, 25 ),
                      new Point( 10, 25 ),
                      new Point( 5, 20 ),
                      new Point( 5, 15 ),
                      new Point( 10, 10 )};
      GraphicsPath Path = new GraphicsPath();

      Path.AddLines (Pts);

      G.SmoothingMode=SmoothingMode.AntiAlias;
      CustomLineCap Lc = new CustomLineCap( null, Path );
      Lc.BaseInset=0;
      Lc.WidthScale=1;
      Lc.StrokeJoin=LineJoin.Miter;
      P.CustomEndCap = Lc;
      P.CustomStartCap=Lc;

      G.DrawLine ( P, 50, 150, 200, 150 );
      G.DrawLine ( P, 150, 50, 150, 200 );

      Lc.Dispose();
      Path.Dispose();
      P.Dispose();
    }

	}
}
