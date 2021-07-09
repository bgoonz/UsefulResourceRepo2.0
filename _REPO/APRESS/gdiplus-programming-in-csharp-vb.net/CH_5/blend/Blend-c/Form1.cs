using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace Blend_c
{ 
	public class Form1 : System.Windows.Forms.Form
	{
    private System.Windows.Forms.HScrollBar AlphaScroll;
    private System.Windows.Forms.HScrollBar GammaScroll;
    /// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

    private int AlphaFactor = 255;
    private float GammaFactor = 1.0f;
    private Rectangle R = new Rectangle(40, 20, 100, 100 );
    private Image I = Image.FromFile("Colorbars.jpg");
    private int ImWidth;
    private int ImHeight;
    private ImageAttributes Ia = new ImageAttributes();



		public Form1()
		{
			//
			// Required for Windows Form Designer support
			//
			InitializeComponent();

      AlphaScroll.Minimum = 20;
      AlphaScroll.Maximum = 245;
      AlphaScroll.SmallChange = 5;
      AlphaScroll.LargeChange = 5;
      AlphaScroll.Left = R.Left;
      AlphaScroll.Width = R.Width;
      AlphaScroll.Top = R.Bottom;

      GammaScroll.Minimum=1;
      GammaScroll.Maximum = 50;
      GammaScroll.SmallChange=1;
      GammaScroll.LargeChange=5;
      GammaScroll.Left = R.Left;
      GammaScroll.Top = R.Top - GammaScroll.Height;
      GammaScroll.Width = R.Width;

      ImWidth = I.Width;
      ImHeight = I.Height;

      AlphaScroll.Value = (AlphaScroll.Maximum-AlphaScroll.Minimum )/2;
      GammaScroll.Value = (GammaScroll.Maximum-GammaScroll.Minimum )/2;
      AlphaFactor = AlphaScroll.Value;
      GammaFactor = (float)GammaScroll.Value / 10;

    }

		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if (components != null) 
				{
					components.Dispose();
				}
        if ( I != null )
          I.Dispose();
        if ( Ia != null )
          Ia.Dispose();
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
      this.AlphaScroll = new System.Windows.Forms.HScrollBar();
      this.GammaScroll = new System.Windows.Forms.HScrollBar();
      this.SuspendLayout();
      // 
      // AlphaScroll
      // 
      this.AlphaScroll.Location = new System.Drawing.Point(32, 128);
      this.AlphaScroll.Maximum = 255;
      this.AlphaScroll.Name = "AlphaScroll";
      this.AlphaScroll.Size = new System.Drawing.Size(160, 16);
      this.AlphaScroll.TabIndex = 1;
      this.AlphaScroll.Scroll += new System.Windows.Forms.ScrollEventHandler(this.AlphaScroll_Scroll);
      // 
      // GammaScroll
      // 
      this.GammaScroll.Location = new System.Drawing.Point(32, 8);
      this.GammaScroll.Name = "GammaScroll";
      this.GammaScroll.Size = new System.Drawing.Size(160, 16);
      this.GammaScroll.TabIndex = 2;
      this.GammaScroll.Scroll += new System.Windows.Forms.ScrollEventHandler(this.GammaScroll_Scroll);
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(292, 273);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.GammaScroll,
                                                                  this.AlphaScroll});
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
      AlphaBlend(e.Graphics);
      base.OnPaint(e);
    }

    private void AlphaBlend( Graphics G )
    {
      //AlphaFactor is variable depeneding upon scroll bars
      Pen P = new Pen( Color.FromArgb (AlphaFactor, 200, 0, 100 ), 20);
      Bitmap bmp = new Bitmap( 120, 120 );
      Graphics G2 = Graphics.FromImage(bmp);
      Brush B = new SolidBrush(Color.FromArgb( AlphaFactor, 50, 200, 50 ));

      try
      {
        // Set the brightness while rendering image
        Ia.SetGamma( GammaFactor );
        G.DrawImage(I, R, 0, 0, ImWidth, ImHeight, GraphicsUnit.Pixel, Ia);
        //Draw transparent line on top of image
        G.DrawLine(P, 10, 100, 200, 100 );

        // Draw inside the image contained in memory
        G2.FillEllipse( B, 0, 0, 75, 75 );
        G.DrawImage( I, new Rectangle(140, 140, 120, 120 ) );
        G.CompositingQuality = CompositingQuality.GammaCorrected;
        G.CompositingMode = CompositingMode.SourceOver;
        G.DrawImage( bmp, new Rectangle( 150, 150, 150, 150 ) );
      }
      finally
      {
        if (bmp != null )
          bmp.Dispose();
        if ( G2 != null )
          G2.Dispose();
        if ( B != null )
          B.Dispose();
        if ( P != null )
          P.Dispose();
      }
    }

    private void AlphaScroll_Scroll(object sender, 
                                    System.Windows.Forms.ScrollEventArgs e)
    {
      AlphaFactor = AlphaScroll.Value;
      this.Refresh();
    }

    private void GammaScroll_Scroll(object sender, 
                                    System.Windows.Forms.ScrollEventArgs e)
    {
      GammaFactor = (float)GammaScroll.Value / 10;
      this.Refresh();
    }

	}
}
