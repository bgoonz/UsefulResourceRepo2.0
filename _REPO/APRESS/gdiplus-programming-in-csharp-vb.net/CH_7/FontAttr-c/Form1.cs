using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Text;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace FontAttr_c
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
    private System.Windows.Forms.Button cmdGo;
    private System.Windows.Forms.Panel P1;
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
      this.cmdGo = new System.Windows.Forms.Button();
      this.P1 = new System.Windows.Forms.Panel();
      this.SuspendLayout();
      // 
      // cmdGo
      // 
      this.cmdGo.Location = new System.Drawing.Point(264, 288);
      this.cmdGo.Name = "cmdGo";
      this.cmdGo.Size = new System.Drawing.Size(56, 24);
      this.cmdGo.TabIndex = 0;
      this.cmdGo.Text = "GO";
      this.cmdGo.Click += new System.EventHandler(this.cmdGo_Click);
      // 
      // P1
      // 
      this.P1.AutoScroll = true;
      this.P1.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.P1.Location = new System.Drawing.Point(16, 32);
      this.P1.Name = "P1";
      this.P1.Size = new System.Drawing.Size(304, 240);
      this.P1.TabIndex = 1;
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(342, 323);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.P1,
                                                                  this.cmdGo});
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

    private void EnumInstalledFonts()
    {
      FontStyle Style;
      int y = 0;

      foreach (FontFamily ff in FontFamily.Families)
      {
        if ( ff.IsStyleAvailable(Style = FontStyle.Regular) )
          AddString(ff, ref y, Style);
        if ( ff.IsStyleAvailable(Style = FontStyle.Bold) )
          AddString(ff, ref y, Style);
        if ( ff.IsStyleAvailable(Style = FontStyle.Italic) )
          AddString(ff, ref y, Style);
        if ( ff.IsStyleAvailable(Style = FontStyle.Strikeout) )
          AddString(ff, ref y, Style);
        if ( ff.IsStyleAvailable(Style = FontStyle.Underline) )
          AddString(ff, ref y, Style);
      }
    }

    private void AddString(FontFamily ff, ref int y, FontStyle Style)
    {
      using ( Font fnt = new Font(ff, 12, Style, GraphicsUnit.Pixel) )
      {
        int LineSpace = (int)(ff.GetLineSpacing(Style) * 
                              fnt.Size / ff.GetEmHeight(Style));
        y += LineSpace + 2;

        PictureBox P = new PictureBox();
        P.Height = LineSpace;
        P.Width = P1.Width;
        Bitmap B = new Bitmap(P.Width, P.Height);
        using (Graphics G = Graphics.FromImage(B))
        {
          G.DrawString(ff.Name + " : Style = " + Style.ToString(), 
                       fnt, Brushes.Black, 0, 0);
        }
        P.Image=B;
        P1.Controls.Add(P);
        P1.Controls[P1.Controls.Count-1].Location = new Point(2, y);
        if ( y < P1.Height )
          P1.Refresh();
      }
    }

    private void cmdGo_Click(object sender, System.EventArgs e)
    {
      P1.Controls.Clear();
      EnumInstalledFonts();
    }

	}
}
