using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace GradientWrap_c
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

    protected override void OnPaint( PaintEventArgs e )
    {
      GraphicsPath Path = new GraphicsPath();
      Rectangle R = new Rectangle(10, 10, 50, 50);
      e.Graphics.DrawRectangle(Pens.Black,R);
      Path.AddRectangle(R);
      
//      PathGradientBrush B = new PathGradientBrush(Path.PathPoints); 
      PathGradientBrush B = new PathGradientBrush(Path.PathPoints, 
        WrapMode.Tile);
      Color[] c = { Color.Blue, Color.Aqua, Color.Red };

      B.CenterColor = Color.White;
      B.SurroundColors = c;

      //Small circle inside gradient path
      e.Graphics.FillEllipse(B, 15, 15, 30, 30);
      //Large circle outside gradient path
      e.Graphics.FillEllipse(B, 50, 50, 150, 150);
    }

	}
}
