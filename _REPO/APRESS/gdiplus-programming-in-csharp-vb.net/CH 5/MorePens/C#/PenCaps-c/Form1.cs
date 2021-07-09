using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace PenCaps_c
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
      this.ClientSize = new System.Drawing.Size(440, 405);
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
      Point[] PtsA = { new Point(10, 10), 
                       new Point(150, 150), 
                       new Point(400, 10) };
      Point[] PtsB = { new Point(10, 40), 
                       new Point(150, 180), 
                       new Point(400, 40) };
      Point[] PtsC = { new Point(10, 70), 
                       new Point(150, 210), 
                       new Point(400, 70) };
      Point[] PtsD = { new Point(10, 100), 
                       new Point(150, 240), 
                       new Point(400, 100) };
      Pen P = new Pen(Color.Blue, 10);

      G.SmoothingMode=SmoothingMode.AntiAlias;
      P.LineJoin=LineJoin.Bevel;
      G.DrawLines(P, PtsA);

      P.LineJoin=LineJoin.Miter;
      G.DrawLines(P, PtsB);

      P.LineJoin=LineJoin.MiterClipped;
      G.DrawLines(P, PtsC);

      P.LineJoin=LineJoin.Round;
      G.DrawLines(P, PtsD);
    }

	}
}
