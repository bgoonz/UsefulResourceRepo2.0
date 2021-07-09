using System;
using System.Drawing;
using System.Drawing.Text;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace GraphicsProps_c
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
    private System.Windows.Forms.Button B0;
    private System.Windows.Forms.Button B1;
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
      this.B0 = new System.Windows.Forms.Button();
      this.B1 = new System.Windows.Forms.Button();
      this.SuspendLayout();
      // 
      // B0
      // 
      this.B0.Location = new System.Drawing.Point(16, 240);
      this.B0.Name = "B0";
      this.B0.Size = new System.Drawing.Size(40, 24);
      this.B0.TabIndex = 0;
      this.B0.Text = "B0";
      this.B0.Click += new System.EventHandler(this.B0_Click);
      // 
      // B1
      // 
      this.B1.Location = new System.Drawing.Point(72, 240);
      this.B1.Name = "B1";
      this.B1.Size = new System.Drawing.Size(40, 24);
      this.B1.TabIndex = 1;
      this.B1.Text = "B1";
      this.B1.Click += new System.EventHandler(this.B1_Click);
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(292, 273);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.B1,
                                                                  this.B0});
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
    protected override void OnPaint ( PaintEventArgs e )
    {
      Graphics G = e.Graphics;

      G.Clear(Color.Bisque);
      //Change one of the Graphics attributes and save state
      G.SmoothingMode=SmoothingMode.AntiAlias;
      GraphicsState OldG = G.Save();

      //Restore the attribute and draw a line
      G.SmoothingMode=SmoothingMode.Default;
      G.DrawLine(new Pen(Color.DarkMagenta, 20), 10, 50, 
                                (int)(this.Width - 10), 140);

      //Restore the old Graphics state and draw another line
      G.Restore(OldG);
      G.DrawLine(new Pen(Color.DarkMagenta, 20), 10, 100, 
                                (int)(this.Width - 10), 190);

      G.Dispose();
    }

    private void B0_Click(object sender, System.EventArgs e)
    {
      BeginContainerNoArg(this.CreateGraphics());
    }

    private void B1_Click(object sender, System.EventArgs e)
    {
     // BeginContainerIntRectArg(this.CreateGraphics());
     // World2PageXform(this.CreateGraphics());
      RenderText(this.CreateGraphics());
    }

    public void BeginContainerNoArg(Graphics G)
    {
      G.Clear(Color.Bisque);

      //Change one of the attributes of the Graphics object
      //then save the state.
      G.SmoothingMode = SmoothingMode.AntiAlias;
      GraphicsContainer OldG  = G.BeginContainer();

      //Restore the Smoothing mode state and draw a line
      G.SmoothingMode = SmoothingMode.Default;
      G.DrawLine(new Pen(Color.Chocolate, 20), 10, 50, 
                                  (int)(this.Width - 10), 150);

      //Restore the old Graphics state and draw another line
      G.EndContainer(OldG);
      G.DrawLine(new Pen(Color.Chocolate, 20), 10, 100, 
                                  (int)(this.Width - 10), 200);

      G.Dispose();
    }

    public void BeginContainerIntRectArg(Graphics G)
    {
      G.Clear(Color.Bisque);

      // Define transformation for container.
      Rectangle srcRect = new Rectangle(0, 0, 200, 200);
      Rectangle destRect = new Rectangle(0, 0, 100, 100);
      // Begin graphics container.
      GraphicsContainer containerState  = G.BeginContainer(destRect, 
                                                srcRect, GraphicsUnit.Pixel);

      G.DrawLine(new Pen(Color.DarkOrchid, 20), 10, 100, 200, 100);
      G.EndContainer(containerState);

      G.DrawLine(new Pen(Color.DarkOrchid, 20), 10, 100, 200, 100);

      G.Dispose();
    }

    public void World2PageXform(Graphics G)
    {
      int EndX = 1;
      int EndY = 1;
      G.Clear(Color.Azure);
      G.PageUnit=GraphicsUnit.Inch;
      G.TranslateTransform(1, 1);
      G.DrawLine(Pens.Blue, 0, 0, EndX, EndY);

      int Xpix = EndX * (int)G.DpiX;
      int Ypix = EndY * (int)G.DpiY;

    }

    public void RenderText(Graphics G)
    {
      Font F = new Font("Arial", 16);
      SolidBrush B = new SolidBrush(Color.Black);

      G.Clear(Color.Azure);
      G.TextRenderingHint = TextRenderingHint.SingleBitPerPixel;
      G.DrawString("SingleBitPerPixel", F, B, new PointF(10, 10));

      G.TextRenderingHint = TextRenderingHint.AntiAlias;
      G.DrawString("AntiAlias default Contrast", F, B, new PointF(10, 60));

      G.TextContrast = 12;
      G.DrawString("AntiAlias Low Contrast", F, B, new PointF(10, 90));

      G.TextContrast = 1;
      G.DrawString("AntiAlias High Contrast", F, B, new PointF(10, 120));

      
    }



	}
}
