using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Text;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace FontMetrics_c
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
    private System.Windows.Forms.Button cmdRoman;
    private System.Windows.Forms.Button cmdArial;
    private System.Windows.Forms.Button cmdComic;
    private System.Windows.Forms.Button cmdCourier;
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
      this.cmdRoman = new System.Windows.Forms.Button();
      this.cmdArial = new System.Windows.Forms.Button();
      this.cmdComic = new System.Windows.Forms.Button();
      this.cmdCourier = new System.Windows.Forms.Button();
      this.SuspendLayout();
      // 
      // cmdRoman
      // 
      this.cmdRoman.Location = new System.Drawing.Point(8, 240);
      this.cmdRoman.Name = "cmdRoman";
      this.cmdRoman.Size = new System.Drawing.Size(104, 24);
      this.cmdRoman.TabIndex = 0;
      this.cmdRoman.Text = "Times Roman";
      this.cmdRoman.Click += new System.EventHandler(this.cmdRoman_Click);
      // 
      // cmdArial
      // 
      this.cmdArial.Location = new System.Drawing.Point(128, 240);
      this.cmdArial.Name = "cmdArial";
      this.cmdArial.Size = new System.Drawing.Size(104, 24);
      this.cmdArial.TabIndex = 1;
      this.cmdArial.Text = "Arial Black";
      this.cmdArial.Click += new System.EventHandler(this.cmdArial_Click);
      // 
      // cmdComic
      // 
      this.cmdComic.Location = new System.Drawing.Point(248, 240);
      this.cmdComic.Name = "cmdComic";
      this.cmdComic.Size = new System.Drawing.Size(104, 24);
      this.cmdComic.TabIndex = 2;
      this.cmdComic.Text = "Comic Sans MS";
      this.cmdComic.Click += new System.EventHandler(this.cmdComic_Click);
      // 
      // cmdCourier
      // 
      this.cmdCourier.Location = new System.Drawing.Point(368, 240);
      this.cmdCourier.Name = "cmdCourier";
      this.cmdCourier.Size = new System.Drawing.Size(104, 24);
      this.cmdCourier.TabIndex = 3;
      this.cmdCourier.Text = "Courier New";
      this.cmdCourier.Click += new System.EventHandler(this.cmdCourier_Click);
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(492, 273);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.cmdCourier,
                                                                  this.cmdComic,
                                                                  this.cmdArial,
                                                                  this.cmdRoman});
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

    private void DisplayFontMetrics(FontFamily ff, Font fnt)
    {
      //Create graphics object and make it pretty
      Graphics G = this.CreateGraphics();
      G.SmoothingMode=SmoothingMode.AntiAlias;
      G.TextRenderingHint=TextRenderingHint.AntiAlias;

      //Get some metrics
      int LineSpace = (int)(ff.GetLineSpacing(fnt.Style)*
                            fnt.Size/ff.GetEmHeight(fnt.Style));
      int Descent = (int)(ff.GetCellDescent(fnt.Style)*
                            fnt.Size/ff.GetEmHeight(fnt.Style));
      int Ascent = (int)(ff.GetCellAscent(fnt.Style)*
                            fnt.Size/ff.GetEmHeight(fnt.Style));

      //Create the base line to sit the text on
      Point BaseLineStart = new Point ( 15, this.Height*3/5);
      Point BaseLineEnd = new Point ( this.Width-15, this.Height*3/5);
      //Top left corner of text is the ascent
      Point StringPoint = new Point(75, (int)(BaseLineStart.Y-Ascent));

      //Clear the screen and draw the string on a base line
      G.Clear(Color.AliceBlue);
      G.DrawString("A j Q", fnt, Brushes.Blue, StringPoint);
      G.DrawLine(Pens.Black, BaseLineStart, BaseLineEnd);

      //Draw the annotation lines 
      Size LineSize = new Size(0, LineSpace);
      Size AscentSize = new Size(0, Ascent);
      Size DescentSize = new Size(0, Descent);
      G.DrawLine(Pens.Black, BaseLineStart-LineSize, BaseLineEnd-LineSize);
      G.DrawLine(Pens.Red, BaseLineStart-AscentSize, BaseLineEnd-AscentSize);
      G.DrawLine(Pens.DarkGreen, BaseLineStart+DescentSize, 
                                 BaseLineEnd+DescentSize);

      //Annotate
      Font AnnoFont = new Font("Arial", 10);
      G.DrawString("Line Space = " + LineSpace.ToString(), AnnoFont, 
        Brushes.Black, 
        20,
        (int)(BaseLineStart.Y-LineSpace-12));

      G.DrawString("Ascent = " + Ascent.ToString(), AnnoFont, 
        Brushes.Red, 
        250,
        (int)(BaseLineStart.Y-Ascent-12));

      G.DrawString("Descent = " + Descent.ToString(), AnnoFont, 
        Brushes.DarkGreen, 
        350,
        (int)(BaseLineStart.Y+Descent/8));
    }

    private void cmdRoman_Click(object sender, System.EventArgs e)
    {
      FontFamily ff = new FontFamily("Times New Roman");
      Font f = new Font(ff, 75, FontStyle.Regular, GraphicsUnit.Pixel);

      DisplayFontMetrics(ff, f);
    }

    private void cmdArial_Click(object sender, System.EventArgs e)
    {
      FontFamily ff = new FontFamily("Arial Black");
      Font f = new Font(ff, 75, FontStyle.Regular, GraphicsUnit.Pixel);

      DisplayFontMetrics(ff, f);
    }

    private void cmdComic_Click(object sender, System.EventArgs e)
    {
      FontFamily ff = new FontFamily("Comic Sans MS");
      Font f = new Font(ff, 75, FontStyle.Regular, GraphicsUnit.Pixel);

      DisplayFontMetrics(ff, f);
    }

    private void cmdCourier_Click(object sender, System.EventArgs e)
    {
      FontFamily ff = new FontFamily("Courier New");
      Font f = new Font(ff, 75, FontStyle.Regular, GraphicsUnit.Pixel);

      DisplayFontMetrics(ff, f);
    }
	}
}
