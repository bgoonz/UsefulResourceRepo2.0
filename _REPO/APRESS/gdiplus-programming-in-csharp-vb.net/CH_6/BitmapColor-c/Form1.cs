using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace BitmapColor_c
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
      ColorPalette cp;
      String s;
      Bitmap bmp = new Bitmap("crane.jpg");

      cp = bmp.Palette;

      foreach (Color c in cp.Entries)
      {
        s = c.ToString();
      }


    }

    protected override void OnPaint(PaintEventArgs e)
    {
      Bitmap bmp = new Bitmap("crane.jpg");
      Color c;

      e.Graphics.DrawImage( bmp, 10, 30 );

      for ( int x=0; x<bmp.Width-1; x++ )
      {
        for ( int y=0; y<bmp.Height-1; y++ )
        {
          c = bmp.GetPixel( x, y );
          c = Color.FromArgb( c.ToArgb() + 100 );
          bmp.SetPixel( x, y, c );
        }
      }
      e.Graphics.DrawImage( bmp, 150, 30 );
    }
	}
}
