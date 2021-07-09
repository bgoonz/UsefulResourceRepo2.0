using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace MetaFile_c
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
      this.MaximizeBox = false;
      this.MinimizeBox = false;
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
      // Create a graphics object from the forms graphics object
      // and get the handle to it.
      using (Graphics FormGraphics = this.CreateGraphics())
      {
        IntPtr hdc = FormGraphics.GetHdc();

        // Now create a blank metafile using the graphics handle
        // This is the metafile where all drawing instructions will 
        // be recorded.
        Metafile mf = new Metafile("mymeta.emf", hdc);

        // In order to record drawing commands we need to draw on something
        // That something is a new graphics object
        using (Graphics MetaGraphics = Graphics.FromImage(mf))
        {
          using ( mf )
          {
            MetaGraphics.SmoothingMode = SmoothingMode.AntiAlias;

            //Now we are ready to draw on the metagraphics object
            MetaGraphics.DrawRectangle(Pens.Black, 10, 10, 100, 50 );
            MetaGraphics.DrawLine(Pens.Orange, 10, 70, 150, 100 );
          }
        }
        FormGraphics.ReleaseHdc(hdc);
      }
    }

    protected override void OnPaint( PaintEventArgs e )
    {
      Metafile mf = new Metafile("mymeta.emf");
      e.Graphics.DrawImage(mf, new Point(10,10));
    }


	}
}
